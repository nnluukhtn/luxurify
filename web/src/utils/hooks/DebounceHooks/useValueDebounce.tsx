import { useEffect, useState } from 'react';

const useValueDebounce = <T extends any>(value: T, delay?: number) => {
  const [debouncedValue, setValue] = useState<T | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => setValue(value), delay || 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};

export default useValueDebounce;
