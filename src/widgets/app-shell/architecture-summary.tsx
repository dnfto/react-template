import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

const items = [
  [
    'Server state',
    'TanStack Query owns remote cache, retries, background refresh, and request lifecycle.',
  ],
  [
    'Client UI state',
    'Zustand is reserved for ephemeral UI state such as panels, dialogs, and preferences.',
  ],
  [
    'API layer',
    'Axios is centralized so auth headers, token refresh, errors, and cancellation stay consistent.',
  ],
  [
    'Routing',
    'TanStack Router provides typed nested routes, route guards, lazy preloading, and layout routes.',
  ],
] as const;

export function ArchitectureSummary() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {items.map(([title, description]) => (
        <Card key={title}>
          <CardHeader>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Keep boundaries explicit and move business behavior into features rather than shared
            components.
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
