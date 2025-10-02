'use client';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    const fetchImageAsBlob = async (url: string) => {
      setIsLoading(true);
      setImageError(false);

      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          throw new Error('画像ではなくJSONが返されました');
        }

        const blob = await res.blob();

        if (guestImage && guestImage.startsWith('blob:')) {
          URL.revokeObjectURL(guestImage);
        }

        const objectURL = URL.createObjectURL(blob);
        setGuestImage(objectURL);
        setImageError(false);
      } catch (err) {
        setImageError(true);
        // フォールバック画像をfetchして表示
        if (url !== '/appare.jpg') {
          await fetchImageAsBlob('/appare.jpg');
        }
      } finally {
        setIsLoading(false);
      }
    };

    const img = imageData.find((item) => item.name === 'image2');
    if (img && img.filename) {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = API_BASE_URL
        ? `${API_BASE_URL}${img.filename}`
        : '/appare.jpg';
      fetchImageAsBlob(url);
    } else {
      fetchImageAsBlob('/appare.jpg');
    }
    const name = textData.find((item) => item.name === 'CultureDepartment_0');
    if (name && name.text) {
      setGuestName(name.text);
    }
    const info = textData.find((item) => item.name === 'CultureDepartment_1');
    if (info && info.text) {
      setGuestInfo(info.text);
    }

    return () => {
      if (guestImage && guestImage.startsWith('blob:')) {
        URL.revokeObjectURL(guestImage);
      }
    };
  }, [imageData, textData]);

  return (
    <div className="w-4/5 sm:w-2/3 p-8 bg-umenobe-light-orange flex flex-col items-center gap-4 sm:gap-8 mb-8 rounded-md">
      <div className="flex justify-center items-center w-1/2">
        {isLoading ? (
          <div className="w-full h-32 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-gray-500 text-sm">読み込み中...</span>
          </div>
        ) : guestImage ? (
          <img
            src={guestImage}
            alt="ゲスト画像"
            className="w-full h-auto object-cover rounded-md"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-32 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-gray-500 text-sm">
              {imageError ? '画像の取得に失敗' : '画像がありません'}
            </span>
          </div>
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
