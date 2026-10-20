import { Link, Outlet } from '@tanstack/react-router';
import { Suspense } from 'react';
import { ThemeToggle } from '@/features/theme/theme-toggle';
import { Button } from '@/shared/components/ui/button';
import { LoadingSpinner } from '@/shared/components/ui/loading-spinner';

const navigation = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/users', label: 'Users' },
] as const;

export function AppLayout() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/" className="font-semibold tracking-tight">
            React Starter
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => (
              <Button key={item.to} asChild variant="ghost" size="sm">
                <Link to={item.to}>{item.label}</Link>
              </Button>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Suspense fallback={<LoadingSpinner label="Loading page" />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
