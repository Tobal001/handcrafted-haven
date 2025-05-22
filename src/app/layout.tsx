import '@/globals.css';
import { Inter } from 'next/font/google';
import { DM_Serif_Display } from 'next/font/google';
import Link from 'next/link';

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
      <body className="bg-[#F9F4EF] text-[#3E3E3E] antialiased font-sans">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4 shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-serif font-bold">H-H</h1>
            <nav className="space-x-4 text-sm font-medium">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/products" className="hover:underline">Shop</Link>
              <Link href="/artisans" className="hover:underline">Artisans</Link>
              <Link href="/about" className="hover:underline">About</Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6">{children}</main>

        {/* Footer */}
        <footer className="mt-16 px-6 py-8 bg-[#F0ECE8] text-center text-sm text-[#6C6C6C]">
          &copy; {new Date().getFullYear()} Handcrafted Haven Marketplace. WWD430 Team 12
        </footer>
      </body>
    </html>
  );
}
