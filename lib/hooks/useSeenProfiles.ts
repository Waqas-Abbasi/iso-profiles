'use client';

import { useCallback, useEffect, useState } from 'react';

import { useIsClient } from './useIsClient';

export function useSeenProfiles() {
    const [seenProfileIds, setSeenProfileIds] = useState<string[]>([]);
    const isClient = useIsClient();

    useEffect(() => {
        if (!isClient) return;

        const stored = localStorage.getItem('seenProfiles');
        if (stored) {
            try {
                setSeenProfileIds(JSON.parse(stored));
            } catch (error) {
                console.error('Error parsing seen profiles:', error);
                setSeenProfileIds([]);
            }
        }
    }, [isClient]);

    const markAsSeen = useCallback((profileId: string) => {
        setSeenProfileIds((current) => {
            if (current.includes(profileId)) return current;
            const newIds = [...current, profileId];
            localStorage.setItem('seenProfiles', JSON.stringify(newIds));
            return newIds;
        });
    }, []);

    const markAsUnseen = useCallback((profileId: string) => {
        setSeenProfileIds((current) => {
            const newIds = current.filter((id) => id !== profileId);
            localStorage.setItem('seenProfiles', JSON.stringify(newIds));
            return newIds;
        });
    }, []);

    const seenProfiles = {
        has: (profileId: string) => seenProfileIds?.includes(profileId) ?? false,
    };

    return {
        seenProfiles,
        markAsSeen,
        markAsUnseen,
        isReady: isClient,
    };
}
