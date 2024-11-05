'use client';

import { Profile } from '@prisma/client';

import { DialogTitle } from '@radix-ui/react-dialog';
import { Bookmark, ExternalLink } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

interface ProfileDetailsProps {
    profile: Profile;
    isSaved: boolean;
    handleSaveToggle: () => void;
}

export default function ProfileDetails({
    profile,
    isSaved,
    handleSaveToggle,
}: ProfileDetailsProps) {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <DialogTitle className="text-2xl font-bold">Profile Details</DialogTitle>

                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                    <Button
                        variant={isSaved ? 'secondary' : 'outline'}
                        onClick={handleSaveToggle}
                        className="w-full sm:w-auto"
                    >
                        <Bookmark className={`mr-2 h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                        {isSaved ? 'Saved' : 'Save'}
                    </Button>
                    <Link
                        href={`https://reddit.com/user/${profile.redditUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto"
                    >
                        <Button
                            variant="outline"
                            className="flex w-full items-center gap-2 sm:w-auto"
                        >
                            <ExternalLink className="h-4 w-4" />
                            Message on Reddit
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <DetailItem label="Age" value={`${profile.age}`} />
                <DetailItem label="Gender" value={profile.gender} />
                <DetailItem
                    label="Age Preference"
                    value={`${profile.ageRangeMin}-${profile.ageRangeMax}`}
                />
                <DetailItem
                    label="Location"
                    value={`${profile.location} ${
                        profile.willingToRelocate ? '(willing to relocate)' : ''
                    }`}
                />
                <DetailItem
                    label="Ethnicity"
                    value={`${profile.ethnicity} ${profile.openToMixing ? '(open to mixing)' : ''}`}
                />
                <DetailItem label="Marital Status" value={profile.maritalStatus} />
                <DetailItem label="Marriage Timeline" value={profile.marriageTimeline} />
                <DetailItem label="Education" value={profile.education} />
                <DetailItem label="Education Wanted" value={profile.educationWanted} />
                <DetailItem label="Job Status" value={profile.jobStatus} />
                <DetailItem label="Want Kids" value={profile.wantKids ? 'Yes' : 'No'} />
                <DetailItem label="Religiosity" value={profile.religiosity} />
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Important Characteristics</h3>
                <p className="text-muted-foreground">{profile.characteristics}</p>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Hobbies</h3>
                <p className="text-muted-foreground">{profile.hobbies}</p>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Interesting Fact</h3>
                <p className="text-muted-foreground">{profile.interesting}</p>
            </div>
        </div>
    );
}

function DetailItem({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
            <dd className="mt-1 text-sm">{value}</dd>
        </div>
    );
}
