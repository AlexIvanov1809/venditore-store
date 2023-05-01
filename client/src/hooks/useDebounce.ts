import { useCallback, useLayoutEffect, useRef } from 'react';

function debounce(callback: Function, delay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (typeof arguments[0] === 'object' && arguments[0] !== null) {
        callback(...arguments);
      }
    }, delay);
  };
}

export default function useDebounce<T>(value: T, callback: Function, delay: number) {
  const valueRef = useRef(value);
  useLayoutEffect(() => {
    valueRef.current = value;
  }, [value]);

  return useCallback(
    debounce(() => callback(valueRef.current), delay),
    [valueRef]
  );
}
