import { Github } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                    <div className="flex items-center space-x-4">
                        <Link
                            href="https://www.reddit.com/user/Brave-ship/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                            Contact Us
                        </Link>
                    </div>
                    <Link
                        href="https://github.com/Waqas-Abbasi/iso-profiles"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                        <Github className="mr-2 h-4 w-4" />
                        View on GitHub
                    </Link>
                </div>
                <div className="mt-4 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Muslim Marriage Profiles. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
