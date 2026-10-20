import { Loader2 } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

type LoadingSpinnerProps = {
  readonly label?: string;
  readonly className?: string;
};

export function LoadingSpinner({ label = 'Loading', className }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground',
        className,
      )}
      role="status"
    >
      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
