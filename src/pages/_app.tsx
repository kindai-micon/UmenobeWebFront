// These styles apply to every route in the application
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Dela_Gothic_One, Zen_Kaku_Gothic_New } from "next/font/google";

const delaOne = Dela_Gothic_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dela-one",
});

const zenkaku = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-zenkaku",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>第67回うめの辺祭 | 近畿大学工学部大学祭</title>
        <meta
          property="og:title"
          content="第67回うめの辺祭 | 近畿大学工学部大学祭"
        />
        <meta
          property="og:description"
          content="近畿大学工学部広島キャンパスで開催される大学祭、うめの辺祭の公式サイトです。今年もイベントや豪華ゲストなどが盛りだくさん！ぜひお越しください！"
        />
        <meta
          name="twitter:title"
          content="第67回うめの辺祭 | 近畿大学工学部大学祭"
        />
        <meta
          name="twitter:description"
          content="近畿大学工学部広島キャンパスで開催される大学祭、うめの辺祭の公式サイトです。今年もイベントや豪華ゲストなどが盛りだくさん！ぜひお越しください！"
        />
      </Head>
      <div
        className={`${delaOne.variable} ${zenkaku.variable} font-dela-one font-zenkaku text-umenobe-black tracking-wider`}
      >
        <Component {...pageProps} />
      </div>
    </>
  );
}
