import { QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { queryClient } from '@/app/providers/query-client';
import { ThemeProvider } from '@/app/providers/theme-provider';
import { GlobalErrorBoundary } from '@/shared/components/error/global-error-boundary';
import { Toaster } from '@/shared/components/ui/sonner';

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="react-template-theme">
          {children}
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </GlobalErrorBoundary>
  );
}
