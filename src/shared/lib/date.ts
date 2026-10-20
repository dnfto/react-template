import { format, parseISO } from 'date-fns';

export function formatDate(value: string | Date, pattern = 'yyyy-MM-dd') {
  const date = typeof value === 'string' ? parseISO(value) : value;
  return format(date, pattern);
}
