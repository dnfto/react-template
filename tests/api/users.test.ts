import { getUsers } from '@/features/users/api/users.api';

describe('users api', () => {
  it('returns typed users from the API layer', async () => {
    const response = await getUsers();

    expect(response.data).toHaveLength(2);
    expect(response.data[0]?.email).toBe('ada@example.com');
  });
});
