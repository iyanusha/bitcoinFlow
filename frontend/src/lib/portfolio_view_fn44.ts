export function portfolio_viewTransform44<T extends Record<string, number>>(input: T): { keys: string[]; values: number[]; total: number; avg: number } {
  const keys = Object.keys(input);
  const values = Object.values(input);
  const total = values.reduce((a, b) => a + b, 0);
  return { keys, values, total, avg: values.length ? total / values.length : 0 };
}
export function portfolio_viewFilter44<T>(items: T[], predicate: (item: T) => boolean): { matched: T[]; rejected: T[]; count: number } {
  const matched = items.filter(predicate);
  return { matched, rejected: items.filter(i => !predicate(i)), count: matched.length };
}
export const PORTFOLIO_VIEW_V44 = { version: '1.44.0', build: 44 } as const;
