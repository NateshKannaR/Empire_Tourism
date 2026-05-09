import type { Metadata, Viewport } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Travr — Explore the World',
  description: 'Discover destinations, book trips, build itineraries, and connect with travelers worldwide.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#030712',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} bg-[#030712] text-gray-100 overflow-x-hidden antialiased`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
