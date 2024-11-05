'use client';

import { Profile } from '@prisma/client';

import { useSearchParams } from 'next/navigation';

import { useSeenProfiles } from '@/lib/hooks/useSeenProfiles';

import ProfileCard from './ProfileCard';
import { Button } from './ui/button';

interface ProfilesListProps {
    profiles: Profile[];
    filters: {
        location: string | null;
        minAge: number | null;
        maxAge: number | null;
        gender: string | null;
        maritalStatus: string | null;
        willingToRelocate: boolean | null;
        sort: string;
    };
    page: number;
    setPage: (page: number) => void;
    profilesPerPage: number;
}

export function ProfilesList({
    profiles,
    filters,
    page,
    setPage,
    profilesPerPage,
}: ProfilesListProps) {
    const searchParams = useSearchParams();
    const { seenProfiles } = useSeenProfiles();
    const seenFilter = searchParams.get('seen') ?? 'all';

    const filteredProfiles = profiles
        .filter((profile) => {
            if (
                filters.location &&
                !profile.location.toLowerCase().includes(filters.location.toLowerCase())
            )
                return false;
            if (filters.minAge && profile.age < filters.minAge) return false;
            if (filters.maxAge && profile.age > filters.maxAge) return false;
            if (filters.gender && profile.gender !== filters.gender) return false;
            if (filters.maritalStatus?.trim() && profile.maritalStatus !== filters.maritalStatus)
                return false;
            if (
                filters.willingToRelocate !== null &&
                filters.willingToRelocate !== undefined &&
                profile.willingToRelocate !== filters.willingToRelocate
            )
                return false;
            const isSeen = seenProfiles.has(profile.id.toString());

            if (seenFilter === 'seen') return isSeen;
            if (seenFilter === 'unseen') return !isSeen;
            return true;
        })
        .sort((a, b) => {
            switch (filters.sort) {
                case 'newest':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                case 'oldest':
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                case 'age-asc':
                    return a.age - b.age;
                case 'age-desc':
                    return b.age - a.age;
                default:
                    return 0;
            }
        });

    const paginatedProfiles = filteredProfiles.slice(0, page * profilesPerPage);

    return (
        <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedProfiles.map((profile) => (
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

            {paginatedProfiles.length < filteredProfiles.length && (
                <div className="mt-8 flex justify-center">
                    <Button onClick={() => setPage(page + 1)} variant="outline">
                        Load More
                    </Button>
                </div>
            )}
        </>
    );
}
