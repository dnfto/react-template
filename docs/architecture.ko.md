# 아키텍처 설명

## Feature-based Architecture

이 템플릿은 파일 종류별 폴더(`components`, `hooks`, `utils`)를 루트에 늘어놓지 않습니다. 규모가 커질수록 파일 종류보다 업무 도메인이 더 중요한 탐색 기준이 되기 때문입니다.

`features`는 비즈니스 능력 단위입니다. 인증, 사용자, 결제, 대시보드처럼 제품 기능을 기준으로 코드를 모읍니다. 각 feature 내부에서는 `api`, `model`, `queries`, `components`처럼 필요한 하위 구조를 자유롭게 둘 수 있습니다.

`shared`는 비즈니스 의미를 모르는 재사용 계층입니다. 여기에 들어온 코드는 여러 feature에서 안정적으로 재사용될 수 있어야 하며, 특정 도메인의 정책을 직접 포함하면 안 됩니다. 계층을 거슬러 올라가는 import는 ESLint가 차단합니다.

`widgets`는 여러 feature와 shared 컴포넌트를 조합해 화면의 큰 덩어리를 만듭니다. 페이지가 너무 커지는 것을 막고, 재사용 가능한 화면 블록을 만들기 위한 계층입니다.

`pages`는 라우트와 직접 연결되는 화면입니다. 페이지는 데이터 조회, feature 조합, 레이아웃 배치의 책임을 갖지만 복잡한 업무 규칙을 직접 품지 않도록 합니다.

## 서버 상태와 클라이언트 상태 분리

서버 상태는 백엔드가 원천 소유자입니다. 캐싱, 재검증, stale time, retry, background refresh 같은 문제가 함께 따라오므로 TanStack Query가 관리합니다.

클라이언트 상태는 브라우저 세션의 UI 상태입니다. 사이드바 열림 여부, 테마, 임시 모달 상태처럼 서버와 동기화할 필요가 없는 값만 Zustand에 둡니다.

서버 응답을 Zustand에 복사하면 캐시 무효화, 동기화, stale 데이터 문제가 중복으로 발생합니다. 서버 데이터는 Query Cache에 두고 query key와 invalidation으로 흐름을 관리하세요.

## API Layer

Axios 인스턴스를 직접 feature에서 만들지 않습니다. `shared/api/http-client.ts`는 인증 adapter, 에러 정규화, 취소 신호를 위한 공통 경계입니다. 실제 인증 상태와 token refresh 구현은 `app/bootstrap.ts`에서 주입하므로 shared 계층이 auth feature를 역참조하지 않습니다.

새 API 함수는 feature 내부 `api` 폴더에 두되, HTTP 호출은 반드시 공통 `apiClient`를 사용하세요. 서버 조회의 재시도 정책은 TanStack Query에서 관리해 HTTP client와 중복 재시도가 발생하지 않게 합니다.

## Routing

TanStack Router는 중첩 레이아웃, route guard, preload, lazy route component를 제공합니다. 보호 라우트는 `beforeLoad`에서 인증 상태를 검사하고, 라우트 컴포넌트는 lazy import로 페이지 단위 코드 스플리팅을 유지합니다.

## Error Handling

런타임 렌더링 오류는 `GlobalErrorBoundary`가 잡고, API 오류는 `ApiError`로 정규화합니다. 사용자가 즉시 이해해야 하는 오류는 toast로 표시하고, 복구 가능한 영역은 `ErrorState`와 retry 액션을 제공합니다.
