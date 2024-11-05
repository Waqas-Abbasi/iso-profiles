'use client';

import { useSavedProfiles } from '@/lib/hooks/useSavedProfiles';

import ProfileCard from './ProfileCard';

export function SavedProfilesList() {
    const { savedProfiles } = useSavedProfiles();

    if (savedProfiles.length === 0) {
        return (
            <div className="py-12 text-center">
                <p className="text-muted-foreground">No saved profiles yet</p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {savedProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} turnSeenOff />
            ))}
        </div>
    );
}
