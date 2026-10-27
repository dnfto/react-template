# 설정 파일 설명

## package.json

프로젝트의 실행 스크립트, 런타임 의존성, 개발 의존성, lint-staged 정책을 정의합니다. 새 도구를 추가할 때는 왜 CI 또는 DX에 필요한지 먼저 검토하세요.

## tsconfig.*.json

TypeScript strict mode를 강제합니다. `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`는 초기에 불편할 수 있지만, 대규모 앱에서 undefined 관련 런타임 오류를 줄여 줍니다.

## vite.config.ts

Vite 빌드, alias, Tailwind v4, React, 타입/린트 체커, 수동 chunk 전략을 정의합니다. 번들 크기가 커질 때는 `npm run build:analyze` 결과를 보고 chunk 전략을 조정하세요.

## eslint.config.js와 .oxlintrc.json

ESLint는 타입 정보를 이용한 정밀 규칙을 담당하고, Oxlint는 빠른 정적 검사를 담당합니다. 규칙을 끄기 전에 코드 구조로 해결할 수 있는지 먼저 확인하세요.

## prettier 설정

포맷 논쟁을 자동화로 제거합니다. 개인 취향에 따라 바꾸지 말고 팀 합의가 있을 때만 수정하세요.

## components.json

shadcn/ui CLI가 어떤 alias와 Tailwind 엔트리를 사용할지 알려줍니다. UI 프리미티브 위치를 바꾸면 이 파일도 함께 수정해야 합니다.

## playwright.config.ts와 vitest.config.ts

단위/통합 테스트와 E2E 테스트의 실행 범위를 분리합니다. Vitest가 Playwright 파일을 수집하지 않도록 범위를 명확히 유지하세요.

## .env 파일들

공개 가능한 기본값은 `.env`, 환경별 기본값은 `.env.development`와 `.env.production`, 개인 로컬 값은 `.env.local`에 둡니다. 개발 모드는 MSW가 기본 활성화되어 백엔드 없이 실행됩니다. 실제 비밀 값은 클라이언트 번들에 포함되면 안 됩니다.

## GitHub Actions

CI는 format check, typecheck, lint, test, build를 먼저 실행하고 통과한 변경에 대해 별도 E2E job을 실행합니다. 로컬에서는 `npm run check`, `npm run build`, `npm run test:e2e` 순서로 같은 검사를 수행할 수 있습니다. 배포 단계는 서비스별 인프라가 정해진 뒤 별도 workflow로 추가하세요.
