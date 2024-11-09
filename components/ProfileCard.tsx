'use client';
import { Profile } from '@prisma/client';
import { clsx } from 'clsx';
import DOMPurify from 'isomorphic-dompurify';
import { MapPin, Calendar, Users } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { useSavedProfiles } from '@/lib/hooks/useSavedProfiles';
import { useSeenProfiles } from '@/lib/hooks/useSeenProfiles';

import ProfileDetails from './ProfileDetails';

// Types
interface ProfileCardProps {
    profile: Profile;
    turnSeenOff?: boolean;
}

// Helpers
function stripHtml(html: string) {
    return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
}

function getGenderColor(gender: string) {
    return gender.toLowerCase() === 'male'
        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
        : 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
}

function ProfileModal({
    children,
    open,
    onOpenChange,
    content,
}: {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    content: React.ReactNode;
}) {
    const isDesktop = useMediaQuery('(min-width: 768px)');

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent
                    className="max-h-[90dvh] max-w-2xl"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                >
                    <ScrollArea className="h-[calc(85dvh-4rem)]">{content}</ScrollArea>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent onOpenAutoFocus={(e) => e.preventDefault()}>
                <div className="mx-auto h-[calc(100dvh-4rem)] w-full max-w-2xl">
                    <DrawerHeader className="text-left">
                        <DrawerTitle>Profile Details</DrawerTitle>
                        <DrawerDescription>
                            View detailed information about this profile
                        </DrawerDescription>
                    </DrawerHeader>
                    <Separator />
                    <ScrollArea className="h-[calc(100dvh-12rem)] p-4">{content}</ScrollArea>
                    <Separator />
                    <DrawerFooter className="pt-2">
                        <p className="text-center text-sm text-muted-foreground">
                            Swipe down to close
                        </p>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

export default function ProfileCard({ profile, turnSeenOff }: ProfileCardProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isExpanded, setIsExpanded] = useState(false);

    const { seenProfiles, markAsSeen, markAsUnseen } = useSeenProfiles();
    const { saveProfile, removeProfile, isProfileSaved } = useSavedProfiles();

    const isSeen = turnSeenOff ? false : seenProfiles.has(profile.id.toString());
    const isSaved = isProfileSaved(profile.id);
    const sanitizedBio = DOMPurify.sanitize(profile.bio);
    const genderColor = getGenderColor(profile.gender);

    // Effects
    useEffect(() => {
        if (isExpanded) markAsSeen(profile.id.toString());
    }, [isExpanded, profile.id, markAsSeen]);

    useEffect(() => {
        const profileId = searchParams.get('id');
        if (profileId === profile.id) setIsExpanded(true);
    }, [profile.id, searchParams]);

    // Handlers
    function handleOpenChange(open: boolean) {
        setIsExpanded(open);
        const params = new URLSearchParams(searchParams.toString());

        if (open) params.set('id', profile.id);
        else params.delete('id');

        router.replace(`?${params.toString()}`, { scroll: false });
    }

    function handleSaveToggle() {
        if (isSaved) removeProfile(profile.id);
        else saveProfile(profile);
    }

    return (
        <ProfileModal
            open={isExpanded}
            onOpenChange={handleOpenChange}
            content={
                <>
                    <ProfileDetails
                        profile={profile}
                        isSaved={isSaved}
                        handleSaveToggle={handleSaveToggle}
                    />
                    {isSeen && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => markAsUnseen(profile.id.toString())}
                            className="mt-2 w-full text-xs text-muted-foreground hover:text-foreground"
                        >
                            Mark as unseen
                        </Button>
                    )}
                </>
            }
        >
            <Card
                className={clsx(
                    'relative cursor-pointer transition-all hover:shadow-lg',
                    isSeen && 'bg-muted/50 opacity-80'
                )}
            >
                <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <h3 className="break-all text-xl font-semibold">
                                {profile.redditUsername}
                            </h3>
                            {isSeen && (
                                <Badge
                                    variant="secondary"
                                    className="bg-muted-foreground/20 text-xs text-muted-foreground"
                                >
                                    Seen
                                </Badge>
                            )}
                        </div>
                        <Badge
                            hoverable={false}
                            className={`${genderColor} shrink-0 whitespace-nowrap border-0`}
                        >
                            {profile.age} • {profile.gender}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex gap-2 text-muted-foreground">
                            <MapPin className="mt-1 h-4 w-4 shrink-0" />
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="break-all">{profile.location}</span>
                                {profile.willingToRelocate && (
                                    <Badge
                                        hoverable={false}
                                        className="shrink-0 border-0 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                    >
                                        Open to Relocate
                                    </Badge>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>
                                Looking for age {profile.ageRangeMin}-{profile.ageRangeMax}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{profile.maritalStatus}</span>
                        </div>

                        <div className="line-clamp-3 text-sm text-muted-foreground">
                            {stripHtml(sanitizedBio)}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </ProfileModal>
    );
}
