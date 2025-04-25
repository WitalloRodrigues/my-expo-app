import { startOfWeek as dfStartOfWeek, endOfWeek as dfEndOfWeek } from 'date-fns';

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function parseTime(timeStr: string): Date {
  const [h, m] = timeStr.split(':').map(Number);
  const now = new Date();
  now.setHours(h, m, 0, 0);
  return new Date(now);
}

export function formatDate(date: Date): string {
  const months = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function getCurrentWeek(): { startDate: Date; endDate: Date } {
  const today = new Date();
  return {
    startDate: dfStartOfWeek(today, { weekStartsOn: 0 }),
    endDate: dfEndOfWeek(today, { weekStartsOn: 0 })
  };
}
