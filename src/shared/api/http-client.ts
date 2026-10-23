import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { HTTP_STATUS } from '@/shared/constants/http';
import { env } from '@/shared/config/env';
import { toApiError } from '@/shared/api/api-error';
import { logger } from '@/shared/lib/logger';

type RetriableAxiosConfig = AxiosRequestConfig & {
  hasRetriedAuth?: boolean;
};

type HttpClientAuth = {
  readonly getAccessToken: () => string | undefined;
  readonly refreshAccessToken: () => Promise<void>;
  readonly clearSession: () => void;
};

let auth: HttpClientAuth | undefined;
let refreshRequest: Promise<void> | undefined;

export function configureHttpClientAuth(nextAuth: HttpClientAuth) {
  auth = nextAuth;

  return () => {
    if (auth === nextAuth) {
      auth = undefined;
      refreshRequest = undefined;
    }
  };
}

export const apiClient = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 15_000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = auth?.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableAxiosConfig | undefined;

    if (
      error.response?.status === HTTP_STATUS.unauthorized &&
      originalRequest &&
      auth &&
      !originalRequest.hasRetriedAuth
    ) {
      originalRequest.hasRetriedAuth = true;

      try {
        refreshRequest ??= auth.refreshAccessToken().finally(() => {
          refreshRequest = undefined;
        });
        await refreshRequest;
        return apiClient(originalRequest);
      } catch (refreshError) {
        auth.clearSession();
        throw toApiError(refreshError);
      }
    }

    const apiError = toApiError(error);
    logger.error(apiError.message, apiError);
    throw apiError;
  },
);
