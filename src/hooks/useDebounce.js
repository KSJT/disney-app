import { useEffect, useState } from 'react';

export const useDebounce = (value, delay) => {

    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {

        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay)

        return () => {
            clearTimeout(handler) 
            // setTimeout()이 리턴하는 값이 id, id로 setTimeout을 해제할 수 있다.
        }
    }, [value, delay]);

    return debouncedValue;
    
}