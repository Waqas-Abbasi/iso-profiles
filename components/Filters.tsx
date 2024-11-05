'use client';

import { SlidersHorizontal, Check } from 'lucide-react';
import { parseAsString, parseAsArrayOf, useQueryState } from 'nuqs';
import { useEffect, useRef, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { cn } from '@/lib/utils';

import { Switch } from './ui/switch';

export default function Filters() {
    const [location, setLocation] = useQueryState('location', {
        shallow: false,
    });
    const [userAge, setUserAge] = useQueryState('userAge', {
        parse: (v) => Number(v) || undefined,
        shallow: false,
    });
    const [maritalStatus, setMaritalStatus] = useQueryState<string[]>('maritalStatus', {
        parse: (value) => {
            const parsed = parseAsArrayOf(parseAsString).parse(value);
            return parsed?.length ? parsed : null;
        },
        defaultValue: [],
        shallow: false,
    });
    const [gender, setGender] = useQueryState('gender', {
        shallow: false,
    });
    const [willingToRelocate, setWillingToRelocate] = useQueryState<boolean>('relocate', {
        parse: (v: string | null) => v === 'true',
        serialize: (v: boolean) => (v ? 'true' : 'false'),
        shallow: false,
    });

    const [showSeen, setShowSeen] = useQueryState('seen', {
        defaultValue: 'all',
        parse: (value: string) => value as 'all' | 'unseen' | 'seen',
    });

    const [marriageTimeline, setMarriageTimeline] = useQueryState('marriageTimeline', {
        shallow: false,
    });

    const [canScroll, setCanScroll] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    // Check if content is scrollable
    useEffect(() => {
        const checkScrollable = () => {
            if (contentRef.current) {
                const { scrollHeight, clientHeight } = contentRef.current;
                setCanScroll(scrollHeight > clientHeight);
            }
        };

        checkScrollable();
        window.addEventListener('resize', checkScrollable);
        return () => window.removeEventListener('resize', checkScrollable);
    }, []);

    const handleReset = () => {
        setLocation(null);
        setUserAge(null);
        setMaritalStatus(null);
        setGender(null);
        setShowSeen('all');
        setWillingToRelocate(null);
        setMarriageTimeline(null);
    };

    const maritalStatusOptions = ['Single', 'Divorced', 'Widowed', 'Married'];

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex h-full w-full flex-col">
                <SheetHeader>
                    <SheetTitle>Filter Profiles</SheetTitle>
                </SheetHeader>
                <div ref={contentRef} className="w-full flex-1 overflow-y-auto px-1">
                    <div className="space-y-6 py-4 pb-8">
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

                        <div className="space-y-2">
                            <Label>Gender</Label>
                            <Select
                                value={gender ?? 'Male'}
                                onValueChange={(value) => setGender(value === 'any' ? null : value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-sm text-muted-foreground">
                                Filter profiles by gender
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label>Your Age</Label>
                            <Input
                                type="number"
                                min={18}
                                max={100}
                                placeholder="Enter your age..."
                                value={userAge || ''}
                                onChange={(e) =>
                                    setUserAge(e.target.value ? Number(e.target.value) : null)
                                }
                            />
                            <p className="text-sm text-muted-foreground">
                                Show profiles where you meet their age preferences
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label>Marital Status</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                    >
                                        {maritalStatus && maritalStatus.length ? (
                                            <div className="flex flex-wrap gap-1">
                                                {maritalStatus.map((status) => (
                                                    <Badge
                                                        variant="secondary"
                                                        key={status}
                                                        className="mr-1"
                                                    >
                                                        {status}
                                                    </Badge>
                                                ))}
                                            </div>
                                        ) : (
                                            'Select marital status...'
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search status..." />
                                        <CommandList>
                                            <CommandEmpty>No status found.</CommandEmpty>
                                            <CommandGroup>
                                                {maritalStatusOptions.map((status) => (
                                                    <CommandItem
                                                        key={status}
                                                        onSelect={() => {
                                                            setMaritalStatus((prev) => {
                                                                if (!prev) return [status];

                                                                const updated = prev.includes(
                                                                    status
                                                                )
                                                                    ? prev.filter(
                                                                          (s) => s !== status
                                                                      )
                                                                    : [...prev, status];

                                                                return updated.length
                                                                    ? updated
                                                                    : null;
                                                            });
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                'mr-2 h-4 w-4',
                                                                maritalStatus?.includes(status)
                                                                    ? 'opacity-100'
                                                                    : 'opacity-0'
                                                            )}
                                                        />
                                                        {status}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <p className="text-sm text-muted-foreground">
                                Filter by current marital status of the profile
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label>Marriage Timeline</Label>
                            <Select
                                value={marriageTimeline ?? 'any'}
                                onValueChange={(value) =>
                                    setMarriageTimeline(value === 'any' ? null : value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select timeline" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="any">Any</SelectItem>
                                    <SelectItem value="ASAP">ASAP</SelectItem>
                                    <SelectItem value="Within 6 months">Within 6 months</SelectItem>
                                    <SelectItem value="Within 1 year">Within 1 year</SelectItem>
                                    <SelectItem value="1-2 years">1-2 years</SelectItem>
                                    <SelectItem value="2+ years">2+ years</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-sm text-muted-foreground">
                                Filter by preferred marriage timeline
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
                </div>
                {canScroll && (
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent" />
                )}
            </SheetContent>
        </Sheet>
    );
}
