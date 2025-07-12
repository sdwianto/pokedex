// src/app/layout.tsx

import clsx from 'clsx';
import type { Metadata } from 'next';
import './globals.css';
import { Poppins } from 'next/font/google';

import ClientRoot from './ClientRoot';

export const metadata: Metadata = {
  title: 'Pokedex',
  description: 'Discover the Most Powerful Pokemon in the Wild!',
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-poppins',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={clsx(poppins.variable, `antialiased`)}>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
