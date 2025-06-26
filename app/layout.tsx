import type { Metadata } from 'next';
import { Sora } from 'next/font/google';

import GlobalAlert from '@/components/alert';

import '../styles/globals.css';

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Cryptography & Network Security',
  description:
    'Secure your message with various encryption and decryption algorithms',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable}`}>
      <body className="antialiased">
        {children}
        <GlobalAlert />
      </body>
    </html>
  );
}
