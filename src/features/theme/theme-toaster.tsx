import { Toaster as Sonner } from 'sonner';
import { useTheme } from '@/features/theme/theme-provider';

export function ThemeToaster() {
  const { theme } = useTheme();

  return <Sonner theme={theme} richColors closeButton />;
}
