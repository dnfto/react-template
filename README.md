# React Starter Template

Production-ready React starter template for company-wide frontend applications.

## Stack

- React 19 with Vite
- TypeScript strict mode
- TanStack Router for typed routing
- TanStack Query for server state
- Zustand for client UI state
- React Hook Form and Zod for forms and validation
- Tailwind CSS v4 and shadcn/ui-compatible primitives
- Axios for HTTP infrastructure
- Vitest, React Testing Library, MSW, and Playwright
- ESLint, Oxlint, Prettier, Husky, lint-staged, and Commitlint

Axios is used because enterprise apps commonly need interceptors, token refresh orchestration, cancellation, and response transformation in one place. `ky` is also excellent for smaller fetch-first applications, but Axios remains a pragmatic default for this template's authentication and retry requirements.

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` starts Vite.
- `npm run build` type-checks and builds production assets.
- `npm run build:analyze` generates a bundle report.
- `npm run typecheck` runs TypeScript project references.
- `npm run lint` runs ESLint and Oxlint.
- `npm run format` formats the repository.
- `npm run test` runs unit and integration tests.
- `npm run test:e2e` runs Playwright.

## Architecture

```text
src/
  app/        application bootstrap, providers, layouts, router
  shared/     reusable cross-feature code with no business ownership
  features/   business capabilities grouped by domain
  widgets/    composed feature/shared blocks used by pages
  pages/      route-level screens
```

Use feature folders for business behavior. Shared code must be stable, generic, and reusable across features. Avoid moving feature-specific logic into `shared` just to avoid imports.

## State Boundary

TanStack Query owns server state because it is asynchronous, cacheable, invalidatable, and ultimately owned by backend APIs. Zustand owns client UI state because it is synchronous and local to the browser session. Do not mirror query data into Zustand.

## Environment

Copy `.env.local.example` to `.env.local` for machine-specific overrides. Public client variables must use the `VITE_` prefix. Runtime validation lives in `src/shared/config/env.ts`.

## Routing

Routes are defined with TanStack Router and support nested layouts, guards, preloading, code splitting, not found, and error boundaries. Protected routes should use `beforeLoad` guards and redirect unauthenticated users.

## API Layer

All HTTP calls go through `src/shared/api/http-client.ts`. The API layer centralizes base URL, auth headers, token refresh, typed responses, retry policy, cancellation, response transformation, logging, and error normalization.

## Testing

- Component tests live in `tests/components`.
- Hook tests live in `tests/hooks`.
- API tests use MSW in `tests/api`.
- Integration tests live in `tests/integration`.
- E2E tests live in `tests/e2e`.

## Git Workflow

Use Conventional Commits:

```text
feat: add account settings page
fix: handle expired access token
chore: update dependencies
```

Recommended branch names:

```text
feature/account-settings
fix/token-refresh-race
chore/dependency-updates
```

## Coding Conventions

- Prefer functional components, custom hooks, composition, and pure functions.
- Keep components small and focused.
- Keep business logic in features, not UI primitives.
- Prefer discriminated unions and readonly data for domain models.
- Avoid `any`, unnecessary assertions, global state abuse, magic strings, and duplicated logic.
- Add barrel exports only for stable public module APIs.
