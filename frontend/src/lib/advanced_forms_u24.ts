export function advanced_formsCalc24(values: number[]): { sum: number; avg: number } {
  if (!values.length) return { sum: 0, avg: 0 };
  const sum = values.reduce((a, b) => a + b, 0);
  return { sum, avg: sum / values.length };
}
export function advanced_formsFilter24<T extends Record<string, unknown>>(items: T[], key: keyof T, val: unknown): T[] {
  return items.filter(i => i[key] === val);
}
export const ADVANCED_FORMS_OPTS_24 = { limit: 50, offset: 0, sort: 'desc' } as const;
