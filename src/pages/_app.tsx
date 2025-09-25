// These styles apply to every route in the application
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Dela_Gothic_One, Zen_Kaku_Gothic_New } from 'next/font/google';

const delaOne = Dela_Gothic_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-dela-one',
});

const zenkaku = Zen_Kaku_Gothic_New({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-zenkaku',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${delaOne.variable} ${zenkaku.variable} font-dela-one font-zenkaku text-umenobe-black tracking-wider`}
    >
      <Component {...pageProps} />
    </div>
  );
}
