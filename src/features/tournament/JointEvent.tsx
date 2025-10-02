import { useEffect, useState } from 'react';

type Props = {
  imageData: string;
  textData: string;
};

export const JointEvent = ({ imageData, textData }: Props) => {
  const [guestImage, setGuestImage] = useState<string>('');
  const [guestName, setGuestName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    const loadImage = async () => {
      if (!imageData) {
        await fetchImageAsBlob('/appare.jpg');
        return;
      }

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

      if (!API_BASE_URL) {
        await fetchImageAsBlob('/appare.jpg');
        return;
      }

      const url = `${API_BASE_URL}${imageData}`;
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
      } finally {
        setIsLoading(false);
      }
    };

    if (textData) {
      setGuestName(textData);
    }

    loadImage();

    return () => {
      if (guestImage && guestImage.startsWith('blob:')) {
        URL.revokeObjectURL(guestImage);
      }
    };
  }, [imageData, textData]);

  return (
    <div className="w-4/5 sm:w-2/3 p-8 bg-white flex flex-col justify-center items-center gap-4 sm:gap-8 rounded-md">
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
      <div className="sm:w-1/2 w-4/5">
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
