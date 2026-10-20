import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import { EmptyState } from '@/shared/components/ui/empty-state';

type DataTableProps<TData> = {
  readonly data: readonly TData[];
  readonly columns: readonly ColumnDef<TData>[];
  readonly emptyTitle?: string;
};

export function DataTable<TData>({
  data,
  columns,
  emptyTitle = 'No results',
}: DataTableProps<TData>) {
  const table = useReactTable({
    data: [...data],
    columns: [...columns],
    getCoreRowModel: getCoreRowModel(),
  });

  if (data.length === 0) {
    return <EmptyState title={emptyTitle} />;
  }

  return (
    <div className="overflow-hidden rounded-md border">
      <table className="w-full caption-bottom text-sm">
        <thead className="bg-muted/50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="h-10 px-3 text-left align-middle font-medium text-muted-foreground"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t transition-colors hover:bg-muted/50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-3 align-middle">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
