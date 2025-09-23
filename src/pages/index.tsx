import { GetStaticProps } from "next";

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
import { ImageItem, TextItem } from '../types/type';

type Props = {
  imageData: ImageItem[];
  textData: TextItem[];
}

export default function Page({imageData, textData}: Props) {
  return (
    <div>
      <Header />

      <div>
        <KeyVisualPage imageData={imageData} textData={textData} />
        <EventInfoPage imageData={imageData} textData={textData} />
        <TimeTablePage imageData={imageData} textData={textData} />
        <GuestPage imageData={imageData} textData={textData}/>
        <TournamentPage imageData={imageData} textData={textData} />
        <ShopPage imageData={imageData} textData={textData} />
        <ExhibitionPage imageData={imageData} textData={textData} />
        <CorporationPage imageData={imageData} textData={textData} />
        <AccessPage imageData={imageData} textData={textData} />
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
    const resImg = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}ImageKeyValues.json`
    );
    const imageData = await resImg.json();
    const resText = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}TextKeyValues.json`
    );
    const textData = await resText.json();

    return {
        props: { imageData, textData },
        revalidate: 43200,
    };
};