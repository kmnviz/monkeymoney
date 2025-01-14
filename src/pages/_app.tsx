import type { AppProps } from 'next/app';
import { Space_Grotesk } from 'next/font/google';
import '@/styles/globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return <div className={spaceGrotesk.variable}>
    <Component
      {...pageProps}
    />
  </div>
}
