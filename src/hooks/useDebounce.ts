import { useCallback, useEffect } from 'react';

const useDebounce = (effect: () => void, deps: string[], delay: number) => {
    const cb = useCallback(effect, deps);

    useEffect(() => {
        const timeout = setTimeout(cb, delay);
        return () => clearTimeout(timeout);
    }, [cb, delay]);
};

export default useDebounce;
