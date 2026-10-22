# React Starter Template

신규 프로젝트에서 라우팅, API, 상태 관리, 테스트, 품질 도구를 다시 구성하지 않고 바로 화면 개발을 시작하기 위한 React 템플릿입니다.

## 바로 시작하기

Node.js 24와 npm 10 이상이 필요합니다. nvm을 사용한다면 저장소의 `.nvmrc`를 그대로 사용할 수 있습니다.

```bash
nvm use
npm ci
npm run dev
```

`http://localhost:5173`을 열면 됩니다. 개발 모드에서는 MSW가 자동으로 실행되므로 백엔드나 로컬 환경 파일 없이 홈과 사용자 목록 예제가 모두 동작합니다.

PR을 올리기 전에는 CI와 같은 검사를 실행하세요.

```bash
npm run check
npm run build
npm run test:e2e
```

## 실제 API 연결하기

개인 환경에서만 필요한 값은 Git에 포함되지 않는 `.env.local`에 둡니다.

```dotenv
VITE_API_BASE_URL="https://api.example.com"
VITE_ENABLE_API_MOCKING="false"
```

`VITE_` 변수는 브라우저 번들에 포함되는 공개 값입니다. 비밀번호나 API secret을 넣으면 안 됩니다. 환경변수 형식은 앱 시작 시 `src/shared/config/env.ts`에서 검증합니다.

## 디렉터리 구조

```text
src/
  app/       앱 초기화, 전역 provider, 레이아웃, 라우터
  features/  도메인별 비즈니스 기능
  mocks/     개발 및 테스트에서 함께 쓰는 API handler
  pages/     라우트 단위 화면 조합
  shared/    도메인에 의존하지 않는 API, UI, hook, 유틸리티
  widgets/   feature를 조합한 재사용 화면 블록
tests/
  api/ components/ hooks/ integration/ e2e/
```

의존성은 `app → pages → widgets → features → shared` 방향으로만 흐릅니다. 아래 계층이 위 계층을 참조하면 ESLint가 실패합니다. 서버 데이터는 TanStack Query에, 브라우저 UI 상태만 Zustand에 둡니다.

## 자주 쓰는 명령어

| 명령어                  | 용도                               |
| ----------------------- | ---------------------------------- |
| `npm run dev`           | Vite 개발 서버 실행                |
| `npm run check`         | 포맷, 타입, 린트, Vitest 전체 검사 |
| `npm run build`         | 타입 검사 후 프로덕션 번들 생성    |
| `npm run test:watch`    | 개발 중 Vitest watch 모드 실행     |
| `npm run test:coverage` | 단위·통합 테스트 커버리지 생성     |
| `npm run test:e2e`      | Chromium과 WebKit E2E 실행         |
| `npm run build:analyze` | 번들 구성 분석                     |
| `npm run lint:fix`      | 안전한 린트 오류 자동 수정         |
| `npm run format`        | 지원 파일 포맷팅                   |

로컬에서 E2E를 처음 실행할 때만 Playwright 브라우저를 설치합니다.

```bash
npx playwright install
```

## 새 서비스로 바꿀 때

1. `package.json` 이름, 앱 이름, HTML 메타데이터, favicon, 테마 저장 키를 서비스에 맞게 바꿉니다.
2. 예제 users feature와 MSW handler를 첫 번째 실제 도메인으로 교체합니다.
3. 백엔드 연동을 시작하면 `.env.local`에 API 주소를 설정하고 mock을 끕니다.
4. 인증 방식은 백엔드 계약에 맞게 교체합니다. 포함된 bearer token 흐름은 연동 예시이며, 가능하면 서버가 관리하는 HttpOnly cookie 방식을 우선 검토합니다.
5. 서비스별 모니터링과 배포 workflow를 추가하되 기존 품질 검사는 유지합니다.

pre-commit hook은 staged 파일만 포맷하고 검사합니다. 커밋 메시지는 `feat: add account settings page`처럼 Conventional Commits 형식을 사용합니다.

세부 설계는 [`docs/architecture.ko.md`](./docs/architecture.ko.md), 테스트 기준은 [`docs/testing.ko.md`](./docs/testing.ko.md)에서 확인할 수 있습니다.
