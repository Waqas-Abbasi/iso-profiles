'use client';

import { SlidersHorizontal } from 'lucide-react';
import { useQueryState } from 'nuqs';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';

export default function Filters() {
    const [location, setLocation] = useQueryState('location');
    const [minAge, setMinAge] = useQueryState('minAge', { parse: (v) => Number(v) || undefined });
    const [maxAge, setMaxAge] = useQueryState('maxAge', { parse: (v) => Number(v) || undefined });
    const [maritalStatus, setMaritalStatus] = useQueryState('maritalStatus');
    const [willingToRelocate, setWillingToRelocate] = useQueryState<boolean>('relocate', {
        parse: (v: string | null) => v === 'true',
        serialize: (v: boolean) => (v ? 'true' : 'false'),
    });

    const [showSeen, setShowSeen] = useQueryState('seen', {
        defaultValue: 'all',
        parse: (value: string) => value as 'all' | 'unseen' | 'seen',
    });

    const handleReset = () => {
        setLocation(null);
        setMinAge(null);
        setMaxAge(null);
        setMaritalStatus(null);
        setWillingToRelocate(null);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Filter Profiles</SheetTitle>
                </SheetHeader>
                <div className="space-y-6 py-4">
                    <div className="space-y-2">
                        <Label>Location</Label>
                        <Input
                            placeholder="Enter city or country or country code..."
                            value={location || ''}
                            onChange={(e) => setLocation(e.target.value || null)}
                        />
                        <p className="text-sm text-muted-foreground">
                            Filter profiles by their current location
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Min Age</Label>
                            <Input
                                type="number"
                                min={18}
                                max={100}
                                placeholder="e.g., 25"
                                value={minAge || ''}
                                onChange={(e) =>
                                    setMinAge(e.target.value ? Number(e.target.value) : null)
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Max Age</Label>
                            <Input
                                type="number"
                                min={18}
                                max={100}
                                placeholder="e.g., 45"
                                value={maxAge || ''}
                                onChange={(e) =>
                                    setMaxAge(e.target.value ? Number(e.target.value) : null)
                                }
                            />
                        </div>
                        <p className="col-span-2 text-sm text-muted-foreground">
                            Set an age range between 18-100 years
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label>Marital Status</Label>
                        <Select
                            value={maritalStatus ?? 'any'}
                            onValueChange={(value) =>
                                setMaritalStatus(value === 'any' ? null : value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select marital status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="any">Any</SelectItem>
                                <SelectItem value="Single">Single</SelectItem>
                                <SelectItem value="Divorced">Divorced</SelectItem>
                                <SelectItem value="Widowed">Widowed</SelectItem>
                                <SelectItem value="Married">Married</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">
                            Filter by current marital status
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label>Willing to Relocate</Label>
                            <Switch
                                checked={willingToRelocate || false}
                                onCheckedChange={(checked) => setWillingToRelocate(checked)}
                            />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Show only profiles open to relocation
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Seen Status</Label>
                        <Select value={showSeen} onValueChange={setShowSeen}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by seen status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Profiles</SelectItem>
                                <SelectItem value="unseen">Unseen Only</SelectItem>
                                <SelectItem value="seen">Seen Only</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button variant="outline" className="w-full" onClick={handleReset}>
                        Reset All Filters
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
