'use client';

import { useEffect, useState } from 'react';

type Props = {
  imageData: string;
  textData: string;
};

export const YShop = ({ imageData, textData }: Props) => {
  const [guestImage, setGuestImage] = useState<string>('');
  useEffect(() => {
    if (imageData) {
      const url = (process.env.NEXT_PUBLIC_API_BASE_URL || '') + imageData;
      setGuestImage(url);
    }
  }, [imageData]);

  return (
    <div className="flex flex-col items-center">
      <div>
        {guestImage && (
          <img
            src={guestImage}
            alt="ゲスト画像"
            width={200}
            height={125}
            className="border-5 border-umenobe-orange rounded-md rotate-90"
          />
        )}
      </div>
      {/* FIXME: margin 要調整 */}
      <p className="w-[125px] text-center mt-5 text-bold">{textData}</p>
      <p>
        {textData}
        {textData}
      </p>
    </div>
  );
};
