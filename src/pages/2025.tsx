'use client';

import { Suspense, useEffect, useState } from 'react';

import { Header } from '@/pages/features/header/Header';
import KeyVisualPage from '@/pages/features/kv';
import EventInfoPage from '@/pages/features/eventinfo';
import TimeTablePage from '@/pages/features/timetable';
import TournamentPage from '@/pages/features/tournament';
import ShopPage from '@/pages/features/shop';
import ExhibitionPage from '@/pages/features/exhibition';
import CorporationPage from '@/pages/features/corporation';
import AccessPage from '@/pages/features/access';
import GuestPage from '@/pages/features/guest';
import FireworkPage from '@/pages/features/firework';
import { ImageItem, TextItem } from '@/types/type';
import { Footer } from '@/pages/components/Footer';

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
