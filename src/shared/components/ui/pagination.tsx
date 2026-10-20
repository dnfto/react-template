import { Button } from '@/shared/components/ui/button';

type PaginationProps = {
  readonly page: number;
  readonly pageCount: number;
  readonly onPageChange: (page: number) => void;
};

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  return (
    <nav className="flex items-center justify-between" aria-label="Pagination">
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {page} of {pageCount}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </nav>
  );
}
