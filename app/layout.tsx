import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        default: 'Muslim Marriage Profiles ',
        template: '%s | Muslim Marriage',
    },
    description: 'A match-making directory for Muslims on Reddit looking for spouses.',
    keywords: ['Reddit', 'Muslim Marriage', 'matrimonial', 'profile browser'],
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        type: 'website',
        title: 'Muslim Marriage - Profile Browser',
        description: 'A match-making directory for Muslims on Reddit looking for spouses.',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <NuqsAdapter>
                    <div className="flex min-h-screen flex-col">
                        <main className="flex-grow px-4 sm:px-5">{children}</main>
                        <Footer />
                    </div>
                    <Toaster richColors />
                </NuqsAdapter>
            </body>
        </html>
    );
}
