'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ImageItem, TextItem } from '@/types/type';

type Props = {
  imageData: ImageItem[];
  textData: TextItem[];
};

export const Guest = ({ imageData, textData }: Props) => {
  const [guestImage, setGuestImage] = useState<string | null>(null);
  const [guestName, setGuestName] = useState<string | null>(null);
  const [guestInfo, setGuestInfo] = useState<string | null>(null);

  useEffect(() => {
    const img = imageData.find((item) => item.name === 'image2');
    if (img && img.filename) {
      const url = (process.env.NEXT_PUBLIC_API_BASE_URL || '') + img.filename;
      setGuestImage(url);
    }
    const name = textData.find((item) => item.name === 'CultureDepartment_0');
    if (name && name.text) {
      setGuestName(name.text);
    }
    const info = textData.find((item) => item.name === 'CultureDepartment_1');
    if (info && info.text) {
      setGuestInfo(info.text);
    }
  }, [imageData, textData]);

  return (
    <div className="w-4/5 sm:w-2/3 p-8 bg-umenobe-light-orange flex flex-col items-center gap-4 sm:gap-8 mb-8 rounded-md">
      <div className="flex justify-center items-center w-1/2">
        {guestImage && (
          <Image
            src={guestImage}
            alt="ゲスト画像"
            width={0}
            height={0}
            sizes="100%"
            style={{ width: '100%', height: 'auto' }}
          />
        )}
      </div>
      <div className="w-4/5 sm:w-1/2">
        <div className="py-2">
          <h2 className="text-lg font-bold">今回のゲストは...</h2>
          <h1 className="text-2xl font-bold">{guestName}</h1>
        </div>
        <p>
          {guestInfo}
          ゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介です
        </p>
      </div>
    </div>
  );
};
