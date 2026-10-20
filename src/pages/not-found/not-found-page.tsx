import { Link } from '@tanstack/react-router';
import { Button } from '@/shared/components/ui/button';

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center text-center">
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        The page you are looking for does not exist or was moved.
      </p>
      <Button asChild className="mt-6">
        <Link to="/">Go home</Link>
      </Button>
    </div>
  );
}
