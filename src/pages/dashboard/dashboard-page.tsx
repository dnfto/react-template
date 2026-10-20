import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

export function DashboardPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Protected dashboard</CardTitle>
        <CardDescription>This route is guarded by authentication infrastructure.</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Replace this page with business widgets after wiring the real authentication flow.
      </CardContent>
    </Card>
  );
}
