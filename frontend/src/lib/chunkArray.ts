/**
 * Split an array into chunks of the specified size.
 * Useful for batch processing large datasets.
 */
export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  if (chunkSize <= 0) return [array];
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

/**
 * Process array items in batches, yielding control between each batch.
 * Prevents long-running tasks from blocking the UI thread.
 */
export async function processInBatches<T, R>(
  items: T[],
  batchSize: number,
  processor: (item: T, index: number) => R,
  onBatchComplete?: (results: R[], batchIndex: number) => void,
): Promise<R[]> {
  const results: R[] = [];
  const chunks = chunkArray(items, batchSize);

  for (let i = 0; i < chunks.length; i++) {
    const batchResults = chunks[i].map((item, j) =>
      processor(item, i * batchSize + j),
    );
    results.push(...batchResults);
    onBatchComplete?.(batchResults, i);

    // Yield to the main thread between batches
    if (i < chunks.length - 1) {
      await new Promise<void>((resolve) => setTimeout(resolve, 0));
    }
  }

  return results;
}
