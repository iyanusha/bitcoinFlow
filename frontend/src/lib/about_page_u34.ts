export function about_pageCalc34(values: number[]): { sum: number; avg: number } {
  if (!values.length) return { sum: 0, avg: 0 };
  const sum = values.reduce((a, b) => a + b, 0);
  return { sum, avg: sum / values.length };
}
export function about_pageFilter34<T extends Record<string, unknown>>(items: T[], key: keyof T, val: unknown): T[] {
  return items.filter(i => i[key] === val);
}
export const ABOUT_PAGE_OPTS_34 = { limit: 50, offset: 0, sort: 'desc' } as const;
