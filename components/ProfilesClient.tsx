'use client';

import { Profile } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';

import Filters from '@/components/Filters';
import SortSelect from '@/components/SortSelect';
import { Badge } from '@/components/ui/badge';

import { ProfilesList } from './ProfilesList';

interface ProfilesClientProps {
    initialProfiles: Profile[];
}

export default function ProfilesContent({ initialProfiles }: ProfilesClientProps) {
    const [gender, setGender] = useQueryState('gender', {
        shallow: false,
    });

    const router = useRouter();

    return (
        <>
            <div className="flex flex-col gap-4 sm:flex-row">
                <Filters />
                <SortSelect />
                <div className="flex gap-2">
                    <Badge
                        hoverable={false}
                        variant={gender === 'Male' ? 'default' : 'outline'}
                        className={`cursor-pointer whitespace-nowrap px-4 py-1 text-sm hover:bg-gray-50 ${
                            gender === 'Male' ? 'bg-gray-50 text-gray-900' : ''
                        }`}
                        onClick={() => setGender(gender === 'Male' ? null : 'Male')}
                    >
                        👨 Male
                    </Badge>
                    <Badge
                        hoverable={false}
                        variant={gender === 'Female' ? 'default' : 'outline'}
                        className={`cursor-pointer whitespace-nowrap px-4 py-1 text-sm hover:bg-gray-50 ${
                            gender === 'Female' ? 'bg-gray-50 text-gray-900' : ''
                        }`}
                        onClick={() => setGender(gender === 'Female' ? null : 'Female')}
                    >
                        👩 Female
                    </Badge>
                    <Badge
                        hoverable={false}
                        variant="outline"
                        className="cursor-pointer whitespace-nowrap px-4 py-1 text-sm"
                        onClick={() => router.push('/')}
                    >
                        Clear Filters
                    </Badge>
                </div>
            </div>

            <ProfilesList profiles={initialProfiles} />
        </>
    );
}
