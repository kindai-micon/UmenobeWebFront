// These styles apply to every route in the application
import '@/styles/globals.css';
import config from '../../tailwind.config';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
