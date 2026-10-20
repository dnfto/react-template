import axios from 'axios';
import { useAuthStore } from '@/features/auth/model/auth.store';
import { env } from '@/shared/config/env';
import type { ApiResponse } from '@/shared/types/api';

const refreshClient = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 15_000,
});

type RefreshTokenResponse = {
  readonly accessToken: string;
  readonly refreshToken: string;
};

export async function refreshAccessToken() {
  const refreshToken = useAuthStore.getState().tokens?.refreshToken;

  if (!refreshToken) {
    throw new Error('Missing refresh token');
  }

  const response = await refreshClient.post<ApiResponse<RefreshTokenResponse>>('/auth/refresh', {
    refreshToken,
  });
  const tokens = response.data.data;
  useAuthStore.getState().setTokens(tokens);

  return tokens;
}
