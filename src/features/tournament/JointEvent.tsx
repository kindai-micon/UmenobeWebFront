import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  imageData: string;
  textData: string;
};

export const JointEvent = ({ imageData, textData }: Props) => {
  const [guestImage, setGuestImage] = useState<string>('');
  const [guestName, setGuestName] = useState<string>('');
  useEffect(() => {
    if (imageData) {
      const url = (process.env.NEXT_PUBLIC_API_BASE_URL || '') + imageData;
      setGuestImage(url);
    }
    if (textData) {
      setGuestName(textData);
    }
  }, [imageData, textData]);

  return (
    <div className="w-1/2 p-8 bg-white flex justify-center items-center gap-8 rounded-md">
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
      <div className="w-1/2">
        <div className="py-2">
          <h1 className="border-b-4 border-dotted border-umenobe-lightblue inline text-2xl font-bold">
            {guestName}
          </h1>
        </div>
        {guestName && (
          <p className="my-4 tracking-widest">
            <span className="bg-umenobe-lightblue px-3 py-1 rounded-sm mr-2">
              場所
            </span>
            {guestName}
          </p>
        )}
        {guestName && (
          <p className="my-4 tracking-widest">
            <span className="bg-umenobe-lightblue px-3 py-1 rounded-sm mr-2">
              時間
            </span>
            {guestName}
          </p>
        )}
        <p>
          {guestName}
          ゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介です
        </p>
        {guestName && (
          <p className="my-4 tracking-widest">
            <span className="py-1 rounded-sm">HP：</span>
            <a href="#">{guestName}</a>
          </p>
        )}
      </div>
    </div>
  );
};
