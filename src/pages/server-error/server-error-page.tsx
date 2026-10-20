import { ErrorState } from '@/shared/components/ui/error-state';

export function ServerErrorPage() {
  return (
    <ErrorState
      title="Server error"
      description="The application could not complete the request."
    />
  );
}
