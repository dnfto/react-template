import { refreshAccessToken } from '@/features/auth/api/refresh-token';
import { useAuthStore } from '@/features/auth/model/auth.store';
import { configureHttpClientAuth } from '@/shared/api/http-client';
import { env } from '@/shared/config/env';

export async function bootstrapApp() {
  configureHttpClientAuth({
    getAccessToken: () => useAuthStore.getState().tokens?.accessToken,
    refreshAccessToken: async () => {
      await refreshAccessToken();
    },
    clearSession: () => useAuthStore.getState().logout(),
  });

  if (import.meta.env.DEV && env.ENABLE_API_MOCKING) {
    const { worker } = await import('@/mocks/browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }
}
