
// src/app/layout.tsx

import '@/globals.css';
import { Inter } from 'next/font/google';
import { DM_Serif_Display } from 'next/font/google';
import { Providers } from './providers';
import ClientHeader from '../components/layout/ClientHeader';
import ClientFooter from '../components/layout/ClientFooter'; // Import the new ClientFooter

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const dmSerifDisplay = DM_Serif_Display({ subsets: ['latin'], weight: '400', variable: '--font-dm-serif' });

export const metadata = {
  title: 'Artisan Marketplace',
  description: 'A curated marketplace for handcrafted goods',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerifDisplay.variable}`}>
      <body className="bg-[#F9F4EF] text-[#3E3E3E] antialiased font-sans flex flex-col min-h-screen">
        <Providers>
          <ClientHeader />
          <main className="flex-grow max-w-7xl mx-auto px-6 pt-4">
            {children}
          </main>
          {/* Use the new ClientFooter component */}
          <ClientFooter />
        </Providers>
      </body>
    </html>
  );
}