import { queryOptions, useQuery } from '@tanstack/react-query';
import { getUsers } from '@/features/users/api/users.api';

export const usersQueryOptions = queryOptions({
  queryKey: ['users'],
  queryFn: ({ signal }) => getUsers(signal),
});

export function useUsersQuery() {
  return useQuery(usersQueryOptions);
}
