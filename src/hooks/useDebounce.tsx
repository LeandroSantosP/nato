import { useState, useEffect } from 'react';

function useDebounce(value: string, delay: number = 300) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		// Set debouncedValue to value after the specified delay
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		// Cleanup function that runs if the value or delay changes before the timeout is reached
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]); // Only re-run effect if value or delay changes

	return debouncedValue;
}

export default useDebounce;