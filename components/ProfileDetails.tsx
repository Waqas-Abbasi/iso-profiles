'use client';

import { Profile } from '@prisma/client';

import { DialogTitle } from '@radix-ui/react-dialog';
import { Bookmark, ExternalLink } from 'lucide-react';

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
            <div className="flex items-start justify-between">
                <DialogTitle className="text-2xl font-bold">Profile Details</DialogTitle>

                <div className="flex items-center gap-2">
                    <Button variant={isSaved ? 'secondary' : 'outline'} onClick={handleSaveToggle}>
                        <Bookmark className={`mr-2 h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                        {isSaved ? 'Saved' : 'Save'}
                    </Button>
                    <a
                        href={`https://reddit.com/user/${profile.redditUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button variant="outline" className="flex items-center gap-2">
                            <ExternalLink className="h-4 w-4" />
                            Message on Reddit
                        </Button>
                    </a>
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
