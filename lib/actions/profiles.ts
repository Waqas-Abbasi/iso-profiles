import { prisma } from '@/lib/prisma';

export async function getProfiles() {
    try {
        return await prisma.profile.findMany({
            orderBy: { createdAt: 'desc' },
        });
    } catch (error) {
        console.error('Error fetching profiles:', error);
        return [];
    }
}
