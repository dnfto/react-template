import { delay, http, HttpResponse } from 'msw';
import { vi } from 'vitest';
import { apiClient, configureHttpClientAuth } from '@/shared/api/http-client';
import { env } from '@/shared/config/env';
import { server } from '../mocks/server';

describe('http client authentication', () => {
  it('shares one token refresh across concurrent unauthorized requests', async () => {
    let accessToken = 'expired';
    let requestCount = 0;
    const refreshAccessToken = vi.fn(async () => {
      await delay(20);
      accessToken = 'renewed';
    });
    const clearSession = vi.fn();
    const dispose = configureHttpClientAuth({
      getAccessToken: () => accessToken,
      refreshAccessToken,
      clearSession,
    });

    server.use(
      http.get(`${env.API_BASE_URL}/protected`, ({ request }) => {
        requestCount += 1;

        if (request.headers.get('authorization') === 'Bearer renewed') {
          return HttpResponse.json({ data: 'ok' });
        }

        return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }),
    );

    try {
      await Promise.all([apiClient.get('/protected'), apiClient.get('/protected')]);

      expect(refreshAccessToken).toHaveBeenCalledTimes(1);
      expect(clearSession).not.toHaveBeenCalled();
      expect(requestCount).toBe(4);
    } finally {
      dispose();
    }
  });
});
