import { describe, expect, it } from 'vitest';
import { deepEqual, shallowEqual } from '../deepEqual';

describe('deepEqual', () => {
  it('returns true for identical primitives', () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual('a', 'a')).toBe(true);
    expect(deepEqual(true, true)).toBe(true);
  });

  it('returns false for different primitives', () => {
    expect(deepEqual(1, 2)).toBe(false);
    expect(deepEqual('a', 'b')).toBe(false);
  });

  it('returns true for same reference', () => {
    const obj = { a: 1 };
    expect(deepEqual(obj, obj)).toBe(true);
  });

  it('returns true for deep equal objects', () => {
    expect(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })).toBe(true);
  });

  it('returns false for different objects', () => {
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
  });

  it('returns true for equal arrays', () => {
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
  });

  it('returns false for different length arrays', () => {
    expect(deepEqual([1, 2], [1, 2, 3])).toBe(false);
  });

  it('returns false for nested differences', () => {
    expect(deepEqual({ a: { b: 1 } }, { a: { b: 2 } })).toBe(false);
  });

  it('handles null values', () => {
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(null, {})).toBe(false);
    expect(deepEqual({}, null)).toBe(false);
  });

  it('handles mixed types', () => {
    expect(deepEqual(1, '1')).toBe(false);
    expect(deepEqual([], {})).toBe(false);
  });
});

describe('shallowEqual', () => {
  it('returns true for same reference', () => {
    const obj = { a: 1 };
    expect(shallowEqual(obj, obj)).toBe(true);
  });

  it('returns true for shallow equal objects', () => {
    expect(shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
  });

  it('returns false for different values', () => {
    expect(shallowEqual({ a: 1 }, { a: 2 })).toBe(false);
  });

  it('returns false for different key counts', () => {
    expect(shallowEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
  });

  it('returns false for nested object differences', () => {
    const obj1 = { a: { b: 1 } };
    const obj2 = { a: { b: 1 } };
    expect(shallowEqual(obj1, obj2)).toBe(false);
  });
});
