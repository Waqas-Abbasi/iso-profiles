'use client';

import { useLocalStorage } from '@uidotdev/usehooks';

export function useSeenProfiles() {
    const [seenProfileIds, setSeenProfileIds] = useLocalStorage<string[]>('seenProfiles', []);

    function markAsSeen(profileId: string) {
        setSeenProfileIds((current: string[]) => {
            if (current.includes(profileId)) return current;
            return [...current, profileId];
        });
    }

    function markAsUnseen(profileId: string) {
        setSeenProfileIds((current: string[]) => current.filter((id) => id !== profileId));
    }

    const seenProfiles = {
        has: (profileId: string) => seenProfileIds.includes(profileId),
    };

    return {
        seenProfiles,
        markAsSeen,
        markAsUnseen,
    };
}
