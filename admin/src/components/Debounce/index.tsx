import { useEffect, useState } from 'react';

function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    console.log('just debounced ⌛');
    useEffect(() => {
        if (value !== '') {
            const timer = setTimeout(
                () => setDebouncedValue(() => value),
                delay || 300,
            );

            return () => {
                clearTimeout(timer);
            };
        } else {
            return () => setDebouncedValue(() => value);
        }
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;
