import { describe, expect, it, beforeEach } from 'vitest';
import {
  measureSync,
  measureAsync,
  getPerformanceEntries,
  getEntriesByName,
  getAverageDuration,
  clearPerformanceEntries,
  markStart,
} from '../performanceMonitor';

describe('performanceMonitor', () => {
  beforeEach(() => {
    clearPerformanceEntries();
  });

  it('measures sync function execution', () => {
    const result = measureSync('test-sync', () => 42);
    expect(result).toBe(42);
    const entries = getEntriesByName('test-sync');
    expect(entries.length).toBe(1);
    expect(entries[0].duration).toBeGreaterThanOrEqual(0);
  });

  it('measures async function execution', async () => {
    const result = await measureAsync('test-async', async () => 'hello');
    expect(result).toBe('hello');
    const entries = getEntriesByName('test-async');
    expect(entries.length).toBe(1);
  });

  it('returns all entries', () => {
    measureSync('a', () => 1);
    measureSync('b', () => 2);
    expect(getPerformanceEntries().length).toBe(2);
  });

  it('filters entries by name', () => {
    measureSync('foo', () => 1);
    measureSync('bar', () => 2);
    measureSync('foo', () => 3);
    expect(getEntriesByName('foo').length).toBe(2);
    expect(getEntriesByName('bar').length).toBe(1);
  });

  it('calculates average duration', () => {
    measureSync('avg', () => { /* noop */ });
    measureSync('avg', () => { /* noop */ });
    const avg = getAverageDuration('avg');
    expect(avg).toBeGreaterThanOrEqual(0);
  });

  it('returns 0 for unknown name average', () => {
    expect(getAverageDuration('unknown')).toBe(0);
  });

  it('clears all entries', () => {
    measureSync('clear-test', () => 1);
    clearPerformanceEntries();
    expect(getPerformanceEntries().length).toBe(0);
  });

  it('markStart returns a stop function with duration', () => {
    const stop = markStart('mark-test');
    const duration = stop();
    expect(duration).toBeGreaterThanOrEqual(0);
    expect(getEntriesByName('mark-test').length).toBe(1);
  });
});
