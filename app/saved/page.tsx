import { ArrowLeft } from 'lucide-react';

import Link from 'next/link';

import { SavedProfilesClient } from '@/components/SavedProfilesClient';
import { Button } from '@/components/ui/button';

export default function SavedProfilesPage() {
    return (
        <div className="container mx-auto py-8">
            <Link href="/">
                <Button variant="ghost" className="mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Profiles
                </Button>
            </Link>
            <h1 className="mb-6 text-2xl font-bold">Saved Profiles</h1>
            <SavedProfilesClient />
        </div>
    );
}
