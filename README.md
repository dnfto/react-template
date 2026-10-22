# React Starter Template

A practical React baseline for starting product screens without rebuilding routing, API, state, testing, and quality tooling on every project.

[한국어 문서](./README.ko.md)

## Start developing

Requirements: Node.js 24 and npm 10 or newer. The repository includes `.nvmrc` for nvm users.

```bash
nvm use
npm ci
npm run dev
```

Open `http://localhost:5173`. Development mode starts MSW automatically, so the home and users examples work without a backend or local environment file.

Before opening a pull request, run the same checks as CI:

```bash
npm run check
npm run build
npm run test:e2e
```

## Connect a backend

Create an ignored `.env.local` only when you need machine-specific values:

```dotenv
VITE_API_BASE_URL="https://api.example.com"
VITE_ENABLE_API_MOCKING="false"
```

All `VITE_` variables are public because Vite embeds them in the browser bundle. Never put secrets in these files. Environment values are validated at startup in `src/shared/config/env.ts`.

## Project structure

```text
src/
  app/       bootstrap, providers, layouts, and router
  features/  business capabilities grouped by domain
  mocks/     local API handlers used in development and tests
  pages/     route-level screen composition
  shared/    domain-independent API, UI, hooks, and utilities
  widgets/   reusable screen sections composed from features
tests/
  api/ components/ hooks/ integration/ e2e/
```

Dependencies flow toward `shared`: app → pages → widgets → features → shared. ESLint rejects imports that point back up the tree. Keep server data in TanStack Query and browser-only UI state in Zustand.

## Common commands

| Command                 | Purpose                                     |
| ----------------------- | ------------------------------------------- |
| `npm run dev`           | Start the Vite development server           |
| `npm run check`         | Run formatting, types, lint, and Vitest     |
| `npm run build`         | Type-check and create the production bundle |
| `npm run test:watch`    | Run Vitest while developing                 |
| `npm run test:coverage` | Generate unit/integration coverage          |
| `npm run test:e2e`      | Run Playwright in Chromium and WebKit       |
| `npm run build:analyze` | Build and inspect bundle composition        |
| `npm run lint:fix`      | Apply safe lint fixes                       |
| `npm run format`        | Format supported files                      |

Install Playwright browsers once before the first local E2E run:

```bash
npx playwright install
```

## Starting a real product

1. Change the package name, app name, HTML metadata, favicon, and theme storage key.
2. Replace the sample users feature and MSW handlers with the first product domain.
3. Point `.env.local` at the development API, then disable mocks when integration starts.
4. Adapt authentication to the backend. The included bearer-token flow is an integration example; prefer server-managed HttpOnly cookies when the platform supports them.
5. Add service-specific monitoring and deployment workflows without weakening the existing quality checks.

The pre-commit hook formats and lints staged files. Commit messages follow Conventional Commits, for example `feat: add account settings page`.

More detail is available in [`docs/architecture.ko.md`](./docs/architecture.ko.md) and [`docs/testing.ko.md`](./docs/testing.ko.md).
