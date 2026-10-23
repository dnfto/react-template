import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AuthTokens = {
  readonly accessToken: string;
  readonly refreshToken: string;
};

type UserSession = {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly roles: readonly string[];
};

export type AuthState = {
  readonly tokens: AuthTokens | null;
  readonly user: UserSession | null;
  readonly isAuthenticated: boolean;
  readonly setSession: (session: { tokens: AuthTokens; user: UserSession }) => void;
  readonly setTokens: (tokens: AuthTokens) => void;
  readonly logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      tokens: null,
      user: null,
      isAuthenticated: false,
      setSession: ({ tokens, user }) => set({ tokens, user, isAuthenticated: true }),
      setTokens: (tokens) => set({ tokens, isAuthenticated: true }),
      logout: () => set({ tokens: null, user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-session',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        tokens: state.tokens,
        user: state.user,
      }),
      merge: (persistedState, currentState) => {
        const session = persistedState as Partial<Pick<AuthState, 'tokens' | 'user'>>;

        return {
          ...currentState,
          ...session,
          isAuthenticated: Boolean(session.tokens),
        };
      },
    },
  ),
);
