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
    const loadImage = async () => {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const guestImg = imageData.find((item) => item.name === 'guest_image');
      const url = `${API_BASE_URL}${guestImg?.filename}`;
      setGuestName(textData.find((item) => item.name === 'guest_name')?.text);
      setGuestInfo(textData.find((item) => item.name === 'guest_desc')?.text);
      await fetchImageAsBlob(url);
    };

    const fetchImageAsBlob = async (url: string) => {
      setIsLoading(true);
      setImageError(false);
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        // レスポンスがJSONかどうかをチェック
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          throw new Error('画像ではなくJSONが返されました');
        }
        // 画像をblobとして取得
        const blob = await res.blob();
        // 既存のObjectURLがあればrevoke
        if (guestImage && guestImage.startsWith('blob:')) {
          URL.revokeObjectURL(guestImage);
        }
        // 新しいObjectURLを作成
        const objectURL = URL.createObjectURL(blob);
        setGuestImage(objectURL);
        setImageError(false);
      } catch (err) {
        console.error('画像の取得に失敗しました:', err);
        setImageError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadImage();

    // cleanup関数でObjectURLをrevoke
    return () => {
      if (guestImage && guestImage.startsWith('blob:')) {
        URL.revokeObjectURL(guestImage);
      }
    };
  }, [imageData, textData]);

  return (
    <div className="w-4/5 sm:w-2/3 p-8 bg-umenobe-light-orange flex flex-col items-center gap-4 sm:gap-8 mb-8 rounded-md">
      <div className="flex justify-center items-center md:w-2/3">
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
      <div className="w-4/5 md:w-2/3">
        <div className="lg:flex lg:items-end lg:gap-4 py-2">
          <h2 className="text-lg font-bold">今回のゲストは...</h2>
          <h1 className="text-2xl font-bold">{guestName}</h1>
        </div>
        <p>{guestInfo}</p>
      </div>
    </div>
  );
};
