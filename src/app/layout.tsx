
// // src/app/layout.tsx

// import '@/globals.css';
// import { Inter, Cardo } from 'next/font/google';
// import { DM_Serif_Display } from 'next/font/google';
// import { Providers } from './providers';
// import ClientHeader from '../components/layout/ClientHeader';

// const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
// const dmSerifDisplay = DM_Serif_Display({ subsets: ['latin'], weight: '400', variable: '--font-dm-serif' });

// export const metadata = {
//   title: 'Artisan Marketplace',
//   description: 'A curated marketplace for handcrafted goods',
// };

// const cardo = Cardo({
//   weight: ['400', '700'],
//   subsets: ['latin'],
//   variable: '--font-cardo',
// });

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" className={`${inter.variable} ${dmSerifDisplay.variable}`}>
//       <body className="bg-[#F9F4EF] text-[#3E3E3E] antialiased font-sans flex flex-col min-h-screen">
//         <Providers>
//           <ClientHeader />
//           <main className="flex-grow max-w-7xl mx-auto px-6 pt-4">
//             {children}
//           </main>
//           <footer className="px-6 py-8 bg-[#F0ECE8] text-center text-sm text-[#6C6C6C]">
//             &copy; {new Date().getFullYear()} Handcrafted Haven Marketplace. WWD430 Team 12
//           </footer>
//         </Providers>
//       </body>
//     </html>
//   );
// }








// src/app/layout.tsx

import '@/globals.css';
import { Inter } from 'next/font/google';
import { DM_Serif_Display } from 'next/font/google';
import { Providers } from './providers';
import ClientHeader from '../components/layout/ClientHeader';

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
          <footer className="px-6 py-8 bg-[#F0ECE8] text-center text-sm text-[#6C6C6C]">
            &copy; {new Date().getFullYear()} Handcrafted Haven Marketplace. WWD430 Team 12
          </footer>
        </Providers>
      </body>
    </html>
  );
}