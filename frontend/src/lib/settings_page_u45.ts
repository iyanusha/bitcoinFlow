export function settings_pageCalc45(values: number[]): { sum: number; avg: number } {
  if (!values.length) return { sum: 0, avg: 0 };
  const sum = values.reduce((a, b) => a + b, 0);
  return { sum, avg: sum / values.length };
}
export function settings_pageFilter45<T extends Record<string, unknown>>(items: T[], key: keyof T, val: unknown): T[] {
  return items.filter(i => i[key] === val);
}
export const SETTINGS_PAGE_OPTS_45 = { limit: 50, offset: 0, sort: 'desc' } as const;
