import { ArchitectureSummary } from '@/widgets/app-shell/architecture-summary';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

export function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border bg-card p-8 shadow-sm">
        <p className="text-sm font-medium text-muted-foreground">Production React Template</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
          A scalable foundation for modern React applications.
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Feature-based architecture, strict TypeScript, typed routing, server-state boundaries,
          reusable UI, and production-grade tooling are ready from day one.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <a href="https://tanstack.com/router" target="_blank" rel="noreferrer">
              Router docs
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer">
              shadcn/ui docs
            </a>
          </Button>
        </div>
      </section>
      <ArchitectureSummary />
      <Card>
        <CardHeader>
          <CardTitle>State management boundary</CardTitle>
          <CardDescription>
            TanStack Query handles server state because it is asynchronous, cacheable, and owned by
            the backend. Zustand handles client UI state because it is local, synchronous, and owned
            by the browser session.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Avoid copying server data into Zustand. Prefer query keys, invalidation, and mutations for
          remote data.
        </CardContent>
      </Card>
    </div>
  );
}
