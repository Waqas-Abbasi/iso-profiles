'use client';

import { Profile } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { useState } from 'react';

import Filters from '@/components/Filters';
import SortSelect from '@/components/SortSelect';
import { Badge } from '@/components/ui/badge';

import { useSeenProfiles } from '@/lib/hooks/useSeenProfiles';

import { ProfilesList } from './ProfilesList';

interface ProfilesClientProps {
    initialProfiles: Profile[];
}

export default function ProfilesContent({ initialProfiles }: ProfilesClientProps) {
    const [profiles] = useState<Profile[]>(initialProfiles);
    const [page, setPage] = useState(1);
    const profilesPerPage = 9;

    // Query params state
    const [location] = useQueryState('location', {
        parse: (v) => v?.trim() || null,
    });
    const [minAge] = useQueryState('minAge', {
        parse: (v) => (v?.trim() ? Number(v) : null),
    });
    const [maxAge] = useQueryState('maxAge', {
        parse: (v) => (v?.trim() ? Number(v) : null),
    });
    const [maritalStatus] = useQueryState('maritalStatus');
    const [willingToRelocate] = useQueryState('relocate', { parse: (v) => v === 'true' });
    const [gender, setGender] = useQueryState('gender');
    const [sort] = useQueryState('sort', { defaultValue: 'newest' });

    const searchParams = useSearchParams();
    const { seenProfiles } = useSeenProfiles();
    const seenFilter = searchParams.get('seen') ?? 'all';

    const filteredProfiles = profiles
        .filter((profile) => {
            if (location && !profile.location.toLowerCase().includes(location.toLowerCase()))
                return false;
            if (minAge && profile.age < minAge) return false;
            if (maxAge && profile.age > maxAge) return false;
            if (gender && profile.gender !== gender) return false;
            if (maritalStatus?.trim() && profile.maritalStatus !== maritalStatus) return false;
            if (
                willingToRelocate !== null &&
                willingToRelocate !== undefined &&
                profile.willingToRelocate !== willingToRelocate
            )
                return false;
            const isSeen = seenProfiles.has(profile.id.toString());

            if (seenFilter === 'seen') return isSeen;
            if (seenFilter === 'unseen') return !isSeen;
            return true;
        })
        .sort((a, b) => {
            switch (sort) {
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

    return (
        <>
            <div className="flex flex-col gap-4 sm:flex-row">
                <Filters />
                <SortSelect />
                <div className="flex gap-2">
                    <Badge
                        hoverable={false}
                        variant={gender === 'Male' ? 'default' : 'outline'}
                        className={`cursor-pointer px-4 py-1 text-sm hover:bg-gray-50 ${
                            gender === 'Male' ? 'bg-gray-50 text-gray-900' : ''
                        }`}
                        onClick={() => setGender(gender === 'Male' ? null : 'Male')}
                    >
                        👨 Male
                    </Badge>
                    <Badge
                        hoverable={false}
                        variant={gender === 'Female' ? 'default' : 'outline'}
                        className={`cursor-pointer px-4 py-1 text-sm hover:bg-gray-50 ${
                            gender === 'Female' ? 'bg-gray-50 text-gray-900' : ''
                        }`}
                        onClick={() => setGender(gender === 'Female' ? null : 'Female')}
                    >
                        👩 Female
                    </Badge>
                </div>
            </div>

            <ProfilesList
                profiles={profiles}
                filters={{
                    location,
                    minAge,
                    maxAge,
                    gender,
                    maritalStatus,
                    willingToRelocate,
                    sort,
                }}
                page={page}
                setPage={setPage}
                profilesPerPage={profilesPerPage}
            />
        </>
    );
}
