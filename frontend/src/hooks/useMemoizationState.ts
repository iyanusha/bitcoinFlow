import { useState, useCallback } from 'react';

export function useMemoizationState<T>(initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [prev, setPrev] = useState<T>(initial);

  const update = useCallback((next: T) => {
    setPrev(value);
    setValue(next);
  }, [value]);

  const revert = useCallback(() => setValue(prev), [prev]);
  return { value, prev, update, revert };
}
