import { useCallback, useLayoutEffect, useRef } from 'react';

export default function useDebounce<T>(value: T, cb: Function, delay: number) {
  const valueRef = useRef(value);
  useLayoutEffect(() => {
    valueRef.current = value;
  }, [value]);

  return useCallback(
    debounce(() => cb(valueRef.current), delay),
    [valueRef]
  );
}

function debounce(callback: Function, delay: number) {
  let timer: any = null;

  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback(...arguments);
    }, delay);
  };
}
