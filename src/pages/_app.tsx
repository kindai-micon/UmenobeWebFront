// These styles apply to every route in the application
import '@/styles/globals.css';
import { Zen_Kaku_Gothic_New } from 'next/font/google';
import type { AppProps } from 'next/app';

const zenkaku = Zen_Kaku_Gothic_New({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-zenkaku',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={zenkaku.className}>
      <Component {...pageProps} />
    </main>
  );
}
