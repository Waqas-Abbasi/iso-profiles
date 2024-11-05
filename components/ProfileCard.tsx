'use client';

import { Profile } from '@prisma/client';

import DOMPurify from 'isomorphic-dompurify';
import { MapPin, Calendar, Users } from 'lucide-react';

import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { useSavedProfiles } from '@/lib/hooks/useSavedProfiles';
import { useSeenProfiles } from '@/lib/hooks/useSeenProfiles';

import ProfileDetails from './ProfileDetails';

interface ProfileCardProps {
    profile: Profile;
    turnSeenOff?: boolean;
}

export default function ProfileCard({ profile, turnSeenOff }: ProfileCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const { seenProfiles, markAsSeen, markAsUnseen } = useSeenProfiles();
    const isSeen = turnSeenOff ? false : seenProfiles.has(profile.id.toString());
    const { saveProfile, removeProfile, isProfileSaved } = useSavedProfiles();
    const isSaved = isProfileSaved(profile.id);
    const sanitizedBio = DOMPurify.sanitize(profile.bio);

    function stripHtml(html: string) {
        const tmp = document.createElement('DIV');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }

    useEffect(() => {
        if (isExpanded) {
            markAsSeen(profile.id.toString());
        }
    }, [isExpanded, profile.id]);

    const genderColor =
        profile.gender.toLowerCase() === 'male'
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
            : 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';

    function handleSaveToggle() {
        if (isSaved) {
            removeProfile(profile.id);
        } else {
            saveProfile(profile);
        }
    }

    return (
        <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
            <DialogTrigger asChild>
                <Card
                    className={`relative cursor-pointer transition-all hover:shadow-lg ${
                        isSeen ? 'bg-muted/50 opacity-80' : ''
                    }`}
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
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
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
                        className="mt-2 text-xs text-muted-foreground hover:text-foreground"
                    >
                        Mark as unseen
                    </Button>
                )}
            </DialogContent>
        </Dialog>
    );
}
