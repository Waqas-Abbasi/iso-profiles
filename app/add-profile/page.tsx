'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
    redditUsername: z.string().min(1, 'Reddit username is required'),
    age: z.number().min(12, 'Must be at least 18 years old').max(100, 'Age must be 100 or less'),
    gender: z.string().min(1, 'Gender is required'),
    location: z.string().min(1, 'Location is required'),
    willingToRelocate: z.boolean(),
    ageRangeMin: z.number().min(12, 'Minimum age must be at least 18'),
    ageRangeMax: z.number().max(100, 'Maximum age must be 100 or less'),
    ethnicity: z.string().min(1, 'Ethnicity is required'),
    openToMixing: z.boolean(),
    educationWanted: z.string().min(1, 'Education preference is required'),
    maritalStatus: z.string().min(1, 'Marital status is required'),
    marriageTimeline: z.string().min(1, 'Marriage timeline is required'),
    characteristics: z.string().min(10, 'Please provide at least 10 characters'),
    religiosity: z.string().min(1, 'Religiosity is required'),
    education: z.string().min(1, 'Education is required'),
    jobStatus: z.string().min(1, 'Job status is required'),
    wantKids: z.boolean(),
    hobbies: z.string().min(10, 'Please provide at least 10 characters'),
    interesting: z.string().min(10, 'Please provide at least 10 characters'),
});

const steps = [
    {
        name: 'Basic Info',
        fields: ['redditUsername', 'age', 'gender', 'location', 'willingToRelocate'],
    },
    {
        name: 'Preferences',
        fields: ['ageRangeMin', 'ageRangeMax', 'ethnicity', 'openToMixing', 'educationWanted'],
    },
    {
        name: 'Personal',
        fields: [
            'maritalStatus',
            'marriageTimeline',
            'characteristics',
            'religiosity',
            'education',
            'jobStatus',
            'wantKids',
            'hobbies',
            'interesting',
        ],
    },
];

export default function AddProfile() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            willingToRelocate: false,
            openToMixing: false,
            wantKids: false,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsSubmitting(true);
            const response = await fetch('/api/profiles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Failed to submit profile');
            }

            router.push('/');
            router.refresh();
        } catch (error) {
            console.error('Error submitting profile:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleBack = () => {
        router.push('/');
    };

    const handleNext = async () => {
        const fields = steps[currentStep].fields;
        const result = await form.trigger(fields as Array<keyof z.infer<typeof formSchema>>);
        if (result) {
            setCurrentStep(currentStep + 1);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Button variant="ghost" onClick={handleBack} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Profiles
            </Button>

            <Card className="mx-auto max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Add Your Profile</CardTitle>
                    <Progress value={((currentStep + 1) / steps.length) * 100} className="w-full" />
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {currentStep === 0 && (
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="redditUsername"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Reddit Username</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="username (without u/)"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="age"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Age</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            {...field}
                                                            onChange={(e) =>
                                                                field.onChange(
                                                                    parseInt(e.target.value)
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="gender"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Gender</FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select gender" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="Male">
                                                                Male
                                                            </SelectItem>
                                                            <SelectItem value="Female">
                                                                Female
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="location"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Location</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="e.g., London, UK"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="willingToRelocate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">
                                                        Willing to Relocate
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Are you open to moving for the right person?
                                                    </FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            {currentStep === 1 && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="ageRangeMin"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Min Age Preference</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            {...field}
                                                            onChange={(e) =>
                                                                field.onChange(
                                                                    parseInt(e.target.value)
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="ageRangeMax"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Max Age Preference</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            {...field}
                                                            onChange={(e) =>
                                                                field.onChange(
                                                                    parseInt(e.target.value)
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="ethnicity"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ethnicity</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="openToMixing"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">
                                                        Open to Mixed Marriages
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Are you open to marrying someone from a
                                                        different ethnic background?
                                                    </FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="educationWanted"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Desired Education Level in Partner
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="maritalStatus"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Marital Status</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Single">
                                                            Single
                                                        </SelectItem>
                                                        <SelectItem value="Divorced">
                                                            Divorced
                                                        </SelectItem>
                                                        <SelectItem value="Widowed">
                                                            Widowed
                                                        </SelectItem>
                                                        <SelectItem value="Married">
                                                            Married
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="marriageTimeline"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Marriage Timeline</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select timeline" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="ASAP">ASAP</SelectItem>
                                                        <SelectItem value="Within 6 months">
                                                            Within 6 months
                                                        </SelectItem>
                                                        <SelectItem value="Within 1 year">
                                                            Within 1 year
                                                        </SelectItem>
                                                        <SelectItem value="1-2 years">
                                                            1-2 years
                                                        </SelectItem>
                                                        <SelectItem value="2+ years">
                                                            2+ years
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="characteristics"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Five Important Characteristics
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="List five important characteristics..."
                                                        className="resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="religiosity"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Level of Religiosity</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="education"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Education Level</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="jobStatus"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Current Job Status</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="wantKids"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">
                                                        Want Kids
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Do you want to have children in the future?
                                                    </FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="hobbies"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Hobbies</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="List your hobbies..."
                                                        className="resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="interesting"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Something Interesting About You
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Share something interesting..."
                                                        className="resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    {currentStep > 0 ? (
                        <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                            Previous
                        </Button>
                    ) : (
                        <div></div> // Empty div to maintain layout
                    )}
                    {currentStep < steps.length - 1 ? (
                        <Button onClick={handleNext}>Next</Button>
                    ) : (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        'Submit Profile'
                                    )}
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will submit your profile. Please make sure all
                                        information is correct.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={form.handleSubmit(onSubmit)}>
                                        Submit
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
