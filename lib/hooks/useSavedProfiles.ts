'use client';

import { Profile } from '@prisma/client';
import { useEffect, useState } from 'react';

import { useIsClient } from './useIsClient';

export function useSavedProfiles() {
    const [savedProfiles, setSavedProfiles] = useState<Profile[]>([]);
    const isClient = useIsClient();

    useEffect(() => {
        if (!isClient) return;

        const stored = localStorage.getItem('savedProfiles');
        if (stored) {
            try {
                setSavedProfiles(JSON.parse(stored));
            } catch (error) {
                console.error('Error parsing saved profiles:', error);
                setSavedProfiles([]);
            }
        }
    }, [isClient]);

    function saveProfile(profile: Profile) {
        setSavedProfiles((current) => {
            if (current.some((p) => p.id === profile.id)) return current;
            const newProfiles = [...current, profile];
            localStorage.setItem('savedProfiles', JSON.stringify(newProfiles));
            return newProfiles;
        });
    }

    function removeProfile(profileId: number) {
        setSavedProfiles((current) => {
            const newProfiles = current.filter((p) => p.id !== profileId);
            localStorage.setItem('savedProfiles', JSON.stringify(newProfiles));
            return newProfiles;
        });
    }

    function isProfileSaved(profileId: number) {
        return savedProfiles.some((p) => p.id === profileId);
    }

    return {
        savedProfiles,
        saveProfile,
        removeProfile,
        isProfileSaved,
        isReady: isClient,
    };
}
