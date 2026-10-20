import { Toaster as Sonner } from 'sonner';
import { useTheme } from '@/app/providers/theme-provider';

export function Toaster() {
  const { theme } = useTheme();
  const resolvedTheme = theme === 'system' ? 'system' : theme;

  return <Sonner theme={resolvedTheme} richColors closeButton />;
}
