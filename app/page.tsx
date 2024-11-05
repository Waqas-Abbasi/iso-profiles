import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

import ProfilesClient from '@/components/ProfilesClient';
import { Button } from '@/components/ui/button';
import { getProfiles } from '@/lib/actions/profiles';

export default async function Home() {
    // Fetch profiles on the server
    const initialProfiles = await getProfiles();

    return (
        <main className="container mx-auto space-y-8 px-4 py-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="text-4xl font-bold text-primary">Matrimonial Profiles</h1>
                <div className="flex items-center justify-end gap-4">
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

            <ProfilesClient initialProfiles={initialProfiles} />
        </main>
    );
}
