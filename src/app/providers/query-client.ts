import { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ApiError, getApiErrorMessage } from '@/shared/api/api-error';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 10 * 60_000,
      retry: (failureCount, error) => {
        if (error instanceof ApiError && error.status !== undefined && error.status < 500) {
          return false;
        }

        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (error) => {
        toast.error(getApiErrorMessage(error));
      },
    },
  },
});
