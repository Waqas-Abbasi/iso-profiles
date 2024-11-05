import { Prisma } from '@prisma/client';

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

export async function getFilteredProfiles(params: {
    location?: string;
    userAge?: number;
    maritalStatus?: string;
    gender?: string;
    relocate?: boolean;
    marriageTimeline?: string;
    sort?: string;
}) {
    try {
        const where: Prisma.ProfileWhereInput = {};

        if (params.location) {
            where.location = {
                contains: params.location,
                // mode: 'insensitive',
            };
        }

        if (params.gender) {
            where.gender = params.gender;
        }

        if (params.maritalStatus) {
            const statuses = params.maritalStatus.split(',');
            where.maritalStatus = {
                in: statuses,
            };
        }

        if (params.relocate !== undefined && params.relocate !== null) {
            where.willingToRelocate = params.relocate;
        }

        if (params.marriageTimeline) {
            where.marriageTimeline = params.marriageTimeline;
        }

        if (params.userAge) {
            where.AND = [
                { ageRangeMin: { lte: params.userAge } },
                { ageRangeMax: { gte: params.userAge } },
            ];
        }

        let orderBy: Prisma.ProfileOrderByWithRelationInput = { createdAt: 'desc' };

        switch (params.sort) {
            case 'newest':
                orderBy = { createdAt: 'desc' };
                break;
            case 'oldest':
                orderBy = { createdAt: 'asc' };
                break;
            case 'age-asc':
                orderBy = { age: 'asc' };
                break;
            case 'age-desc':
                orderBy = { age: 'desc' };
                break;
            default:
                orderBy = { createdAt: 'desc' };
        }

        const profiles = await prisma.profile.findMany({
            where,
            orderBy,
        });

        return profiles;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
}
