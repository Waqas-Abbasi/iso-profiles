export default function MigrationPage() {
    return (
        <div className="container mx-auto flex min-h-[80vh] items-center justify-center py-8">
            <div className="max-w-2xl space-y-6 text-center">
                <h1 className="text-4xl font-bold text-primary">Jazakallah Khayrun</h1>
                <div className="space-y-4 text-lg text-muted-foreground">
                    <p>
                        I hope that this was of benefit to you, however I&apos;ve decided not to
                        continue with this project and instead have developed a full marriage
                        platform which builds on top of the concept of ISO profiles.
                    </p>
                    <p className="font-semibold text-primary">
                        You can check it out{' '}
                        <a
                            href="https://noormatch.com"
                            className="text-rose-600 underline transition-colors hover:text-primary/90"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            noormatch.com
                        </a>
                    </p>
                    <p className="mt-8 text-base">
                        All data related to isoprofiles is scheduled for deletion. If you have any
                        questions, please reach out to{' '}
                        <a
                            href="mailto:info@noormatch.com"
                            className="underline transition-colors hover:text-primary/90"
                        >
                            info@noormatch.com
                        </a>{' '}
                        or you can also contact me on Reddit:{' '}
                        <a
                            href="https://www.reddit.com/user/Brave-Ship/"
                            className="underline transition-colors hover:text-primary/90"
                        >
                            Brave-Ship
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
