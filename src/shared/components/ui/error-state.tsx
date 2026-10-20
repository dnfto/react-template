import { AlertTriangle } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

type ErrorStateProps = {
  readonly title?: string;
  readonly description?: string;
  readonly onRetry?: () => void;
};

export function ErrorState({
  title = 'Something went wrong',
  description,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-destructive/30 bg-destructive/5 p-10 text-center">
      <AlertTriangle className="mb-4 size-10 text-destructive" aria-hidden="true" />
      <h3 className="text-lg font-semibold">{title}</h3>
      {description ? (
        <p className="mt-1 max-w-md text-sm text-muted-foreground">{description}</p>
      ) : null}
      {onRetry ? (
        <Button className="mt-4" variant="outline" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}
