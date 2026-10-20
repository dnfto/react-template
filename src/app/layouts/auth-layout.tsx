import { Outlet } from '@tanstack/react-router';

export function AuthLayout() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-muted/40 px-4 py-10">
      <Outlet />
    </main>
  );
}
