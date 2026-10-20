import type { ReactNode } from 'react';
import { Inbox } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

type EmptyStateProps = {
  readonly title: string;
  readonly description?: string;
  readonly action?: ReactNode;
  readonly className?: string;
};

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border border-dashed p-10 text-center',
        className,
      )}
    >
      <Inbox className="mb-4 size-10 text-muted-foreground" aria-hidden="true" />
      <h3 className="text-lg font-semibold">{title}</h3>
      {description ? (
        <p className="mt-1 max-w-md text-sm text-muted-foreground">{description}</p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
