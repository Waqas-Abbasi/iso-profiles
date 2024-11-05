import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Matrimonial Profiles',
    description: 'Find your life partner with Matrimonial Profiles',
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
                </NuqsAdapter>
            </body>
        </html>
    );
}
