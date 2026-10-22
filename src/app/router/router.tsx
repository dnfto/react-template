import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  lazyRouteComponent,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { env } from '@/shared/config/env';
import type { AuthState } from '@/features/auth/model/auth.store';
import { AppLayout } from '@/app/layouts/app-layout';
import { AuthLayout } from '@/app/layouts/auth-layout';
import { NotFoundPage } from '@/pages/not-found/not-found-page';
import { ServerErrorPage } from '@/pages/server-error/server-error-page';
import { usersQueryOptions } from '@/features/users/queries/users.queries';

type RouterContext = {
  readonly auth: AuthState;
  readonly queryClient: QueryClient;
};

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
      {import.meta.env.DEV && env.ENABLE_ROUTER_DEVTOOLS ? (
        <TanStackRouterDevtools position="bottom-right" />
      ) : null}
    </>
  ),
  notFoundComponent: NotFoundPage,
  errorComponent: ServerErrorPage,
});

const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'app',
  component: AppLayout,
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'auth',
  component: AuthLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/',
  component: lazyRouteComponent(() => import('@/pages/home/home-page'), 'HomePage'),
});

const dashboardRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/dashboard',
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/' });
    }
  },
  component: lazyRouteComponent(() => import('@/pages/dashboard/dashboard-page'), 'DashboardPage'),
});

const usersRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/users',
  loader: ({ context }) => context.queryClient.ensureQueryData(usersQueryOptions),
  component: lazyRouteComponent(() => import('@/pages/users/users-page'), 'UsersPage'),
});

const serverErrorRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/500',
  component: ServerErrorPage,
});

const routeTree = rootRoute.addChildren([
  appRoute.addChildren([indexRoute, dashboardRoute, usersRoute]),
  authRoute.addChildren([serverErrorRoute]),
]);

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  context: undefined as unknown as RouterContext,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
