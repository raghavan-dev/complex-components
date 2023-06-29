import { useMemo, useState } from 'react';

/**
 * Debounces a function based on the provided wait time.
 *
 * @param func The function to be debounced
 * @param wait The wait time
 * @returns The debounced function
 */
function debounce<T extends (...args: any) => any>(func: T, wait = 300) {
  let timeout: ReturnType<typeof setTimeout>;
  function debounced(...args: Parameters<T>) {
    const later = () => {
      // @ts-ignore
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
  debounced.clear = () => {
    clearTimeout(timeout);
  };
  return debounced;
}

/**
 * A custom hook which debounces the state updates.
 *
 * @param initialValue The initial state value
 * @param wait The debounce wait time
 * @returns The value and debounced state setter
 */
export function useDebouncedState<V>(initialValue: V, wait: number) {
  const [ value, setValue ] = useState(initialValue);
  const debouncedSetValue = useMemo(
    () => debounce(setValue, wait),
    [setValue]
  );

  return [ value, debouncedSetValue ] as const;
}
