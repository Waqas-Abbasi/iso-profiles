'use client';

import { Profile } from '@prisma/client';
import { useLocalStorage } from '@uidotdev/usehooks';

export function useSavedProfiles() {
    const [savedProfiles, setSavedProfiles] = useLocalStorage<Profile[]>('savedProfiles', []);

    function saveProfile(profile: Profile) {
        setSavedProfiles((current: Profile[]) => {
            if (current.some((p) => p.id === profile.id)) return current;
            return [...current, profile];
        });
    }

    function removeProfile(profileId: number) {
        setSavedProfiles((current: Profile[]) => current.filter((p) => p.id !== profileId));
    }

    function isProfileSaved(profileId: number) {
        return savedProfiles.some((p: Profile) => p.id === profileId);
    }

    return {
        savedProfiles,
        saveProfile,
        removeProfile,
        isProfileSaved,
    };
}
