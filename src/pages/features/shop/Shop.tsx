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
    <div className='flex flex-col items-center'>
      <div>
        {guestImage && (
          <Image
            src={guestImage}
            alt="ゲスト画像"
            width={200}
            height={125}
            className='border-5 border-umenobe-orange rounded-md'
          />
        )}
      </div>
      <p className='w-[200px] text-center mt-1'>{textData}</p>
    </div>
)}