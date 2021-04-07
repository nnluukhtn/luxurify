import { useRef, useEffect } from 'react';

const useFnDebounce = () => {
  const debouncer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const debounceFn = (
    fn: (...args: any) => any,
    delay?: number,
    args?: any,
  ) => {
    if (debouncer.current !== undefined) clearTimeout(debouncer.current);
    debouncer.current = setTimeout(() => fn(args), delay || 1000);
  };

  useEffect(() => {
    return () => {
      if (debouncer.current !== undefined) clearTimeout(debouncer.current);
      debouncer.current = undefined;
    };
  }, []);

  return debounceFn;
};

export default useFnDebounce;
