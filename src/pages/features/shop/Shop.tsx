"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  imageData: string;
  textData: string;
};

export const Shop = ({ imageData, textData }: Props) => {
  const [guestImage, setGuestImage] = useState<string>('');
  useEffect(() => {
    if (imageData) {
      const url = (process.env.NEXT_PUBLIC_API_BASE_URL || '') + imageData;
      setGuestImage(url);
    }
  }, [imageData]);

  return(
    <div>
      {guestImage && (
        <Image
          src={guestImage}
          alt="ゲスト画像"
          width={150}
          height={100}
        />
      )}
      <h1>{textData}</h1>
    </div>
)}