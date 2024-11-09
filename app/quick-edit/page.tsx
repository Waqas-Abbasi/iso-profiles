'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RichTextEditor from '@/components/ui/text-editor';
import { Textarea } from '@/components/ui/textarea';

export default function QuickEdit() {
    const router = useRouter();
    const [isRawMode, setIsRawMode] = useState(true);
    const [content, setContent] = useState<string>(``);

    return (
        <div className="container mx-auto py-8">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>

            <Card className="mx-auto max-w-4xl">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Quick Bio Editor</span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsRawMode(!isRawMode)}
                        >
                            {isRawMode ? 'Rich Text Mode' : 'Raw HTML Mode'}
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="mb-4 gap-y-2">
                            <p className="font-medium">Bio Format Guide</p>
                            <ul className="mt-2 list-disc space-y-2 pl-4 text-sm">
                                <li>Ethnicity, and are you more open to mixing?</li>
                                <li>Five important characteristics you look for in a prospect</li>
                                <li>
                                    State/specify your level of religiosity, and what are you
                                    looking for?
                                </li>
                                <li>Level of education, and what are you looking for?</li>
                                <li>Current Job Status</li>
                                <li>Do you want kids?</li>
                                <li>List 3 hobbies, or things you like to do in your spare time</li>
                                <li>
                                    Add something short and interesting about you that makes you
                                    stand out!
                                </li>
                            </ul>
                        </div>

                        {isRawMode ? (
                            <div className="space-y-2">
                                <Textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="h-[600px] font-mono text-sm"
                                />
                                <div className="flex gap-2">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => {
                                            navigator.clipboard.writeText(content);
                                            toast.success('HTML copied to clipboard!');
                                        }}
                                    >
                                        Copy HTML
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={async () => {
                                            try {
                                                const text = await navigator.clipboard.readText();
                                                setContent(text);
                                                toast.success('Content pasted from clipboard!');
                                            } catch (error) {
                                                toast.error('Failed to paste from clipboard');
                                            }
                                        }}
                                    >
                                        Paste from Clipboard
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <RichTextEditor
                                value={content}
                                onChange={(value) => setContent(value)}
                            />
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
