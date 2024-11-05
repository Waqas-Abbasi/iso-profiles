'use client';

import { Profile } from '@prisma/client';

import { useSearchParams } from 'next/navigation';

import { useSeenProfiles } from '@/lib/hooks/useSeenProfiles';

import ProfileCard from './ProfileCard';

interface ProfilesListProps {
    profiles: Profile[];
}

export function ProfilesList({ profiles }: ProfilesListProps) {
    const searchParams = useSearchParams();
    const { seenProfiles } = useSeenProfiles();
    const seenFilter = searchParams.get('seen') ?? 'all';

    const filteredProfiles = profiles.filter((profile) => {
        const isSeen = seenProfiles.has(profile.id.toString());
        if (seenFilter === 'seen') return isSeen;
        if (seenFilter === 'unseen') return !isSeen;
        return true;
    });

    return (
        <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProfiles.map((profile) => (
                    <ProfileCard key={profile.id} profile={profile} />
                ))}
            </div>

            {filteredProfiles.length === 0 && (
                <div className="py-12 text-center">
                    <p className="text-lg text-muted-foreground">
                        No profiles match your filters. Try adjusting your criteria.
                    </p>
                </div>
            )}
        </>
    );
}
