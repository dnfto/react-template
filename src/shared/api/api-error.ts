import axios from 'axios';
import type { ApiFailure } from '@/shared/types/api';

export class ApiError extends Error {
  readonly status: number | undefined;
  readonly code: string | undefined;
  readonly details: Record<string, unknown> | undefined;

  constructor(error: ApiFailure) {
    super(error.message);
    this.name = 'ApiError';
    this.status = error.status;
    this.code = error.code;
    this.details = error.details;
  }
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }

  if (axios.isAxiosError<ApiFailure>(error)) {
    const failure = {
      message: error.response?.data?.message ?? error.message,
      ...(error.response?.data?.code ? { code: error.response.data.code } : {}),
      ...(error.response?.status ? { status: error.response.status } : {}),
      ...(error.response?.data?.details ? { details: error.response.data.details } : {}),
    } satisfies ApiFailure;

    return new ApiError(failure);
  }

  if (error instanceof Error) {
    return new ApiError({ message: error.message });
  }

  return new ApiError({ message: 'Unexpected error occurred' });
}

export function getApiErrorMessage(error: unknown) {
  return toApiError(error).message;
}
