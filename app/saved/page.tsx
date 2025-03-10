import { ArrowLeft } from 'lucide-react';

import Link from 'next/link';

import { redirect } from 'next/navigation';

import { SavedProfilesList } from '@/components/SavedProfilesList';
import { Button } from '@/components/ui/button';

export default function SavedProfilesPage() {
    redirect('/');

    return (
        <div className="container mx-auto py-8">
            <Link href="/">
                <Button variant="ghost" className="mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Profiles
                </Button>
            </Link>
            <div className="flex flex-col gap-6 pl-2">
                <h1 className="text-2xl font-bold">Saved Profiles</h1>
                <SavedProfilesList />
            </div>
        </div>
    );
}
