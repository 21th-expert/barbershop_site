import type { Metadata } from 'next';
import './globals.css';
import settings from '@/data/settings.json';

export const metadata: Metadata = {
  title: {
    default: `${settings.shopName} – ${settings.tagline}`,
    template: `%s | ${settings.shopName}`,
  },
  description: settings.tagline,
  keywords: ['barbershop', 'haircut', 'beard trim', 'fade', 'hot shave', settings.address],
  openGraph: {
    title: settings.shopName,
    description: settings.tagline,
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
