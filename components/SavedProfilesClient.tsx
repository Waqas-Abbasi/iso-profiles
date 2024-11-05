'use client';

import { ClientOnly } from '@/components/ClientOnly';

import { SavedProfilesList } from './SavedProfilesList';

export function SavedProfilesClient() {
    return (
        <ClientOnly>
            <SavedProfilesList />
        </ClientOnly>
    );
}
