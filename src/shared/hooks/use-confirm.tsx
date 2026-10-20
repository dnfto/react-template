import { useCallback, useState } from 'react';
import { ConfirmDialog, type ConfirmDialogOptions } from '@/shared/components/ui/confirm-dialog';

type PendingConfirmation = ConfirmDialogOptions & {
  readonly resolve: (confirmed: boolean) => void;
};

export function useConfirm() {
  const [pending, setPending] = useState<PendingConfirmation | null>(null);

  const confirm = useCallback((options: ConfirmDialogOptions) => {
    return new Promise<boolean>((resolve) => {
      setPending({ ...options, resolve });
    });
  }, []);

  const dialog = pending ? (
    <ConfirmDialog
      {...pending}
      open
      onOpenChange={(open) => {
        if (!open) {
          pending.resolve(false);
          setPending(null);
        }
      }}
      onConfirm={() => {
        pending.resolve(true);
        setPending(null);
      }}
    />
  ) : null;

  return { confirm, dialog } as const;
}
