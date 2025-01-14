// @ts-nocheck
import React from 'react';
import { Space_Grotesk } from 'next/font/google';
// import type { Metadata } from 'next';
import '@/styles/globals.css';
import Header from '@/components/layout/header';

// export const metadata: Metadata = {
//   title: 'Monkey Money',
//   description: 'Lets find out',
// };

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

export default function RootLayout(
  {
    children,
  }: {
    children: React.ReactNode,
  }
) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.variable}>
        <Header />
        {children}
      </body>
    </html>
  )
}
