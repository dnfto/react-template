import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useUsersQuery } from '@/features/users/queries/users.queries';
import type { User } from '@/features/users/model/user.types';
import { DataTable } from '@/shared/components/ui/data-table';
import { ErrorState } from '@/shared/components/ui/error-state';
import { LoadingSpinner } from '@/shared/components/ui/loading-spinner';
import { formatDate } from '@/shared/lib/date';

export function UsersPage() {
  const usersQuery = useUsersQuery();
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'role', header: 'Role' },
      { accessorKey: 'status', header: 'Status' },
      {
        accessorKey: 'createdAt',
        header: 'Created',
        cell: ({ getValue }) => formatDate(String(getValue())),
      },
    ],
    [],
  );

  if (usersQuery.isLoading) {
    return <LoadingSpinner label="Loading users" />;
  }

  if (usersQuery.isError) {
    return (
      <ErrorState
        description={usersQuery.error.message}
        onRetry={() => void usersQuery.refetch()}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
        <p className="text-sm text-muted-foreground">
          Example server-state table powered by TanStack Query.
        </p>
      </div>
      <DataTable data={usersQuery.data?.data ?? []} columns={columns} emptyTitle="No users found" />
    </div>
  );
}
