import { QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { queryClient } from '@/app/providers/query-client';
import { ThemeProvider } from '@/features/theme/theme-provider';
import { ThemeToaster } from '@/features/theme/theme-toaster';
import { GlobalErrorBoundary } from '@/shared/components/error/global-error-boundary';

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="react-template-theme">
          {children}
          <ThemeToaster />
        </ThemeProvider>
      </QueryClientProvider>
    </GlobalErrorBoundary>
  );
}
