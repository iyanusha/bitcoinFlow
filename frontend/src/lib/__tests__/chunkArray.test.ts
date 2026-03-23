import { describe, expect, it, vi } from 'vitest';
import { chunkArray, processInBatches } from '../chunkArray';

describe('chunkArray', () => {
  it('splits array into chunks', () => {
    expect(chunkArray([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('handles exact division', () => {
    expect(chunkArray([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
  });

  it('handles chunk size larger than array', () => {
    expect(chunkArray([1, 2], 5)).toEqual([[1, 2]]);
  });

  it('handles empty array', () => {
    expect(chunkArray([], 3)).toEqual([]);
  });

  it('handles chunk size of 1', () => {
    expect(chunkArray([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
  });

  it('returns original as single chunk for invalid size', () => {
    expect(chunkArray([1, 2], 0)).toEqual([[1, 2]]);
  });
});

describe('processInBatches', () => {
  it('processes all items', async () => {
    const items = [1, 2, 3, 4, 5];
    const results = await processInBatches(items, 2, (x) => x * 2);
    expect(results).toEqual([2, 4, 6, 8, 10]);
  });

  it('calls onBatchComplete for each batch', async () => {
    const callback = vi.fn();
    await processInBatches([1, 2, 3, 4], 2, (x) => x, callback);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('provides correct index to processor', async () => {
    const indices: number[] = [];
    await processInBatches(['a', 'b', 'c'], 2, (_, i) => {
      indices.push(i);
      return i;
    });
    expect(indices).toEqual([0, 1, 2]);
  });
});
