import { apiClient } from '@/shared/api/http-client';
import type { ApiResponse } from '@/shared/types/api';
import type { User } from '@/features/users/model/user.types';

export async function getUsers(signal?: AbortSignal) {
  return apiClient.get<never, ApiResponse<readonly User[]>>(
    '/users',
    signal ? { signal } : undefined,
  );
}
