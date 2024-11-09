'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
import RichTextEditor from '@/components/ui/text-editor';

const formSchema = z.object({
    redditUsername: z.string().min(1, 'Reddit username is required'),
    age: z.number().min(12, 'Must be at least 18 years old').max(100, 'Age must be 100 or less'),
    gender: z.string().min(1, 'Gender is required'),
    location: z.string().min(1, 'Location is required'),
    willingToRelocate: z.boolean(),
    ageRangeMin: z.number().min(12, 'Minimum age must be at least 18'),
    ageRangeMax: z.number().max(100, 'Maximum age must be 100 or less'),
    maritalStatus: z.string().min(1, 'Marital status is required'),
    marriageTimeline: z.string().min(1, 'Marriage timeline is required'),
    bio: z.string().min(150, 'Please provide at least 150 characters describing yourself'),
});

const steps = [
    {
        name: 'Basic Information',
        fields: [
            'redditUsername',
            'age',
            'gender',
            'location',
            'willingToRelocate',
            'maritalStatus',
        ],
    },
    {
        name: 'Preferences',
        fields: ['ageRangeMin', 'ageRangeMax', 'marriageTimeline'],
    },
    {
        name: 'About You',
        fields: ['bio'],
    },
];

export default function AddProfile() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            willingToRelocate: false,
            age: 0,
            ageRangeMin: 0,
            ageRangeMax: 0,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsSubmitting(true);
            setIsModalOpen(false);

            const loadingToast = toast.loading('Submitting your profile...');

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

            toast.success('Profile submitted successfully!', {
                id: loadingToast,
                closeButton: true,
            });

            router.push('/');
            router.refresh();
        } catch (error) {
            console.error('Error submitting profile:', error);
            toast.error('Failed to submit profile. Please try again.', {
                closeButton: true,
            });
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

    const handleSubmitClick = async () => {
        const bioResult = await form.trigger('bio');
        if (bioResult) {
            setIsModalOpen(true);
        }
    };

    return (
        <div className="container mx-auto py-8">
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
                                                            value={field.value || ''}
                                                            onChange={(e) => {
                                                                const value = e.target.value
                                                                    ? parseInt(e.target.value)
                                                                    : 0;
                                                                field.onChange(value);
                                                            }}
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
                                    <FormDescription>
                                        If you&apos;re only willing to relocate within a country or
                                        reigion, please include that in the location field e.g.
                                        (London, UK - Willing to relocate within UK)
                                    </FormDescription>
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
                                    <FormField
                                        control={form.control}
                                        name="maritalStatus"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Your Marital Status</FormLabel>
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
                                                            value={field.value || ''}
                                                            onChange={(e) => {
                                                                const value = e.target.value
                                                                    ? parseInt(e.target.value)
                                                                    : 0;
                                                                field.onChange(value);
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Minimum age you would consider for a
                                                        potential partner
                                                    </FormDescription>
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
                                                            value={field.value || ''}
                                                            onChange={(e) => {
                                                                const value = e.target.value
                                                                    ? parseInt(e.target.value)
                                                                    : 0;
                                                                field.onChange(value);
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Maximum age you would consider for a
                                                        potential partner
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
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
                                                <FormDescription>
                                                    Your preferred timeline for getting married
                                                    after finding the right person
                                                </FormDescription>
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
                                        name="bio"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="mb-4 gap-y-2">
                                                    <p className="font-medium">
                                                        Please answer these questions (Include the
                                                        questions as part of your answer)
                                                    </p>
                                                    <ul className="mt-2 list-disc space-y-2 pl-4 text-sm">
                                                        <li>
                                                            Ethnicity, and are you more open to
                                                            mixing?
                                                        </li>
                                                        <li>
                                                            Five important characteristics you look
                                                            for in a prospect
                                                        </li>
                                                        <li>
                                                            State/specify your level of religiosity,
                                                            and what are you looking for?
                                                        </li>
                                                        <li>
                                                            Level of education, and what are you
                                                            looking for?
                                                        </li>
                                                        <li>Current Job Status</li>
                                                        <li>Do you want kids?</li>
                                                        <li>
                                                            List 3 hobbies, or things you like to do
                                                            in your spare time
                                                        </li>
                                                        <li>
                                                            Add something short and interesting
                                                            about you that makes you stand out!
                                                        </li>
                                                    </ul>
                                                </div>
                                                <FormControl>
                                                    <RichTextEditor {...field} />
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
                        <Button
                            variant="outline"
                            className="min-w-[10rem]"
                            onClick={() => setCurrentStep(currentStep - 1)}
                        >
                            Previous
                        </Button>
                    ) : (
                        <div></div> // Empty div to maintain layout
                    )}
                    {currentStep < steps.length - 1 ? (
                        <Button onClick={handleNext} className="min-w-[10rem]">
                            Next
                        </Button>
                    ) : (
                        <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                            <AlertDialogTrigger asChild>
                                <Button
                                    disabled={isSubmitting}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSubmitClick();
                                    }}
                                >
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
                                        information is correct, you will not be able to edit it
                                        after submission.
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
