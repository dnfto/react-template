import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = PropsWithChildren<{
  defaultTheme?: Theme;
  storageKey?: string;
}>;

type ThemeProviderState = {
  readonly theme: Theme;
  readonly setTheme: (theme: Theme) => void;
};

const initialState = {
  theme: 'system',
  setTheme: () => undefined,
} satisfies ThemeProviderState;

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem(storageKey) as Theme | null) ?? defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme: (nextTheme: Theme) => {
        localStorage.setItem(storageKey, nextTheme);
        setThemeState(nextTheme);
      },
    }),
    [storageKey, theme],
  );

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
