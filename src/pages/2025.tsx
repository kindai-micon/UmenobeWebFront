'use client';

import { Suspense, useEffect, useState } from 'react';

import { Header } from './features/header/Header';
import KeyVisualPage from './features/kv';
import EventInfoPage from './features/eventinfo';
import TimeTablePage from './features/timetable';
import TournamentPage from './features/tournament';
import ShopPage from './features/shop';
import ExhibitionPage from './features/exhibition';
import CorporationPage from './features/corporation';
import AccessPage from './features/access';
import GuestPage from './features/guest';
import FireworkPage from './features/firework';
import { ImageItem, TextItem } from '../types/type';
import { Footer } from './components/Footer';

function MainContent() {
  const [imageData, setImageData] = useState<ImageItem[]>([]);
  const [textData, setTextData] = useState<TextItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resImg = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}ImageKeyValues.json`);
        const imageData = await resImg.json();
        const resText = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}TextKeyValues.json`);
        const textData = await resText.json();

        setImageData(imageData);
        setTextData(textData);
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <KeyVisualPage />
      <EventInfoPage />
      <TimeTablePage />
      <GuestPage imageData={imageData} textData={textData} />
      <TournamentPage />
      <ShopPage imageData={imageData} textData={textData} />
      <ExhibitionPage imageData={imageData} textData={textData} />
      <CorporationPage imageData={imageData} textData={textData} />
      <FireworkPage />
      <AccessPage />
    </div>
  );
}

export default function Page() {
  return (
    <div>
      <Header />
      <Suspense
        fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}
      >
        <MainContent />
      </Suspense>
      <Footer />
    </div>
  );
}
