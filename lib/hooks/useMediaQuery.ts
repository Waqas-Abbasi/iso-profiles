'use client';

import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
    // Initialize with false on server/initial render
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        // Create media query list
        const mediaQuery = window.matchMedia(query);

        // Set initial value
        setMatches(mediaQuery.matches);

        // Create event listener function
        function onChange(event: MediaQueryListEvent) {
            setMatches(event.matches);
        }

        // Add event listener
        mediaQuery.addEventListener('change', onChange);

        // Cleanup
        return () => {
            mediaQuery.removeEventListener('change', onChange);
        };
    }, [query]); // Only re-run if query changes

    return matches;
}
