import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { refreshAccessToken } from '@/features/auth/api/refresh-token';
import { useAuthStore } from '@/features/auth/model/auth.store';
import { HTTP_STATUS, IDEMPOTENT_METHODS } from '@/shared/constants/http';
import { env } from '@/shared/config/env';
import { toApiError } from '@/shared/api/api-error';
import { logger } from '@/shared/lib/logger';

type RetriableAxiosConfig = AxiosRequestConfig & {
  retryCount?: number;
  hasRetriedAuth?: boolean;
};

const MAX_RETRY_COUNT = 2;

export const apiClient = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 15_000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().tokens?.accessToken;

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
      !originalRequest.hasRetriedAuth
    ) {
      originalRequest.hasRetriedAuth = true;

      try {
        await refreshAccessToken();
        return apiClient(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        throw toApiError(refreshError);
      }
    }

    if (originalRequest && shouldRetry(error, originalRequest)) {
      originalRequest.retryCount = (originalRequest.retryCount ?? 0) + 1;
      await delay(300 * originalRequest.retryCount);
      return apiClient(originalRequest);
    }

    const apiError = toApiError(error);
    logger.error(apiError.message, apiError);
    throw apiError;
  },
);

function shouldRetry(error: AxiosError, config?: RetriableAxiosConfig) {
  if (!config) {
    return false;
  }

  const method = config.method?.toLowerCase();
  const canRetryMethod = method
    ? IDEMPOTENT_METHODS.includes(method as (typeof IDEMPOTENT_METHODS)[number])
    : false;
  const retryCount = config.retryCount ?? 0;
  const status = error.response?.status;

  return (
    canRetryMethod && retryCount < MAX_RETRY_COUNT && (!status || status >= HTTP_STATUS.serverError)
  );
}

function delay(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
