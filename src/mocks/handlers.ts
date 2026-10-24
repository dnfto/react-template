import { http, HttpResponse } from 'msw';
import type { User } from '@/features/users/model/user.types';
import { env } from '@/shared/config/env';

const users = [
  {
    id: 'usr_1',
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2026-01-15T09:00:00.000Z',
  },
  {
    id: 'usr_2',
    name: 'Grace Hopper',
    email: 'grace@example.com',
    role: 'member',
    status: 'invited',
    createdAt: '2026-02-20T09:00:00.000Z',
  },
] as const satisfies readonly User[];

export const handlers = [
  http.get(`${env.API_BASE_URL}/users`, () => {
    return HttpResponse.json({ data: users });
  }),
];
