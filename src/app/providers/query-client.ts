import { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/shared/api/api-error';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 10 * 60_000,
      retry: (failureCount, error) => {
        const status =
          error instanceof Error && 'status' in error ? Number(error.status) : undefined;
        return status !== undefined && status < 500 ? false : failureCount < 2;
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
