import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        default: 'ISO Profiles - Reddit Muslim Marriage',
        template: '%s | ISO Profiles',
    },
    description:
        "A helper tool for browsing and managing Reddit's Muslim Marriage ISO profiles. Sort, filter, save, and create profiles with an improved interface.",
    keywords: ['Reddit', 'Muslim Marriage', 'ISO profiles', 'matrimonial', 'profile browser'],
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        type: 'website',
        title: 'ISO Profiles - Reddit Muslim Marriage Browser',
        description:
            "A helper tool for browsing and managing Reddit's Muslim Marriage ISO profiles. Sort, filter, save, and create profiles with an improved interface.",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <NuqsAdapter>
                    <div className="flex min-h-screen flex-col">
                        <main className="flex-grow px-5">{children}</main>
                        <Footer />
                    </div>
                    <Toaster richColors />
                </NuqsAdapter>
            </body>
        </html>
    );
}
