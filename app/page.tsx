import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

import ProfilesClient from '@/components/ProfilesClient';
import { Button } from '@/components/ui/button';
import { getFilteredProfiles } from '@/lib/actions/profiles';

export default async function ProfilesPage({
    searchParams,
}: {
    searchParams: Promise<{
        location?: string;
        userAge?: string;
        maritalStatus?: string;
        gender?: string;
        relocate?: string;
        marriageTimeline?: string;
        seen?: 'all' | 'seen' | 'unseen';
        sort?: string;
    }>;
}) {
    const queryParams = await searchParams;

    const { location, userAge, maritalStatus, gender, relocate, marriageTimeline, sort } =
        queryParams;

    const profiles = await getFilteredProfiles({
        location: location,
        userAge: userAge ? parseInt(userAge) : undefined,
        maritalStatus: maritalStatus,
        gender: gender,
        relocate: relocate ? relocate === 'true' : undefined,
        marriageTimeline: marriageTimeline,
        sort,
    });

    return (
        <div className="container mx-auto space-y-8 px-4 py-8">
            <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex w-full flex-col gap-2">
                    <h1 className="text-4xl font-bold text-primary">ISO Profiles</h1>
                    <p className="text-muted-foreground">
                        A helper tool for Reddit&apos;s Muslim Marriage ISO profiles. Browse
                        profiles with an improved interface, sort and filter to find matches, save
                        profiles you&apos;re interested in, and create your own.
                    </p>
                </div>
                <div className="flex w-full items-center justify-end gap-4">
                    <Link
                        href="/saved"
                        className="text-sm text-muted-foreground hover:text-primary hover:underline"
                    >
                        Saved Profiles
                    </Link>
                    <Link href="/add-profile">
                        <Button className="flex items-center gap-2">
                            <PlusCircle className="h-5 w-5" />
                            Add Profile
                        </Button>
                    </Link>
                </div>
            </div>

            <ProfilesClient initialProfiles={profiles} />
        </div>
    );
}
