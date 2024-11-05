import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const profile = await prisma.profile.create({
            data,
        });
        return NextResponse.json(profile);
    } catch (error) {
        console.error('Error creating profile:', error);
        return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const profiles = await prisma.profile.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(profiles);
    } catch (error) {
        console.error('Error fetching profiles:', error);
        return NextResponse.json({ error: 'Failed to fetch profiles' }, { status: 500 });
    }
}
