'use client';

import { useIsClient } from '@uidotdev/usehooks';

interface ClientOnlyProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
    const isClient = useIsClient();

    if (!isClient) {
        return fallback;
    }

    return children;
}
