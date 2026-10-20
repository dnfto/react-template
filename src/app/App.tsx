import { RouterProvider } from '@tanstack/react-router';
import { AppProvider } from '@/app/providers/app-provider';
import { queryClient } from '@/app/providers/query-client';
import { router } from '@/app/router/router';
import { useAuthStore } from '@/features/auth/model/auth.store';

export function App() {
  const auth = useAuthStore();

  return (
    <AppProvider>
      <RouterProvider router={router} context={{ auth, queryClient }} />
    </AppProvider>
  );
}
