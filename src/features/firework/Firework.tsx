import { useEffect, useState } from 'react';

const imageData = '4eb3e7f2afc74299b0d4568595c952b7.png';

export const Firework = () => {
  const [fireworkImage, setFireworkImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    const loadImage = async () => {
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

        if (fireworkImage && fireworkImage.startsWith('blob:')) {
          URL.revokeObjectURL(fireworkImage);
        }

        const objectURL = URL.createObjectURL(blob);
        setFireworkImage(objectURL);
        setImageError(false);
      } catch (err) {
        setImageError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();

    return () => {
      if (fireworkImage && fireworkImage.startsWith('blob:')) {
        URL.revokeObjectURL(fireworkImage);
      }
    };
  }, [imageData]);

  return (
    <div className="flex flex-col items-center pb-8">
      <div className="flex flex-col items-center justify-center gap-8 py-8">
        <div className="w-1/2">
          {isLoading ? (
            <div className="w-full h-[400px] bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-500 text-sm">読み込み中...</span>
            </div>
          ) : fireworkImage ? (
            <img
              src={fireworkImage}
              alt="打ち上げ花火"
              className="w-full h-auto object-cover rounded-md"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-[400px] bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-500 text-sm">
                {imageError ? '画像の取得に失敗' : '画像がありません'}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center gap-8 text-center my-4">
          <p className="text-lg sm:text-2xl font-bold mb-2">
            キャッチコピーキャッチコピー
          </p>

          <div className="flex flex-col items-start gap-4">
            {/* {exhibitName && ( */}
            <p className="tracking-widest">
              <span className="bg-umenobe-lightblue px-3 py-1 rounded-sm mr-2">
                観覧場所
              </span>
              第3駐車場
            </p>
            {/* )} */}
            {/* {exhibitName && ( */}
            <p className="tracking-widest">
              <span className="bg-umenobe-lightblue px-3 py-1 rounded-sm mr-2">
                開始時刻
              </span>
              19:00~
            </p>
            {/* )} */}
          </div>
        </div>
      </div>
      <div className="w-4/5 sm:w-1/2">
        <h2 className="text-2xl font-bold text-center py-8 tracking-widest font-dela-one text-umenobe-dark-blue">
          注意事項
        </h2>
        <p>
          説明です説明です説明です説明です説明です説明です説明です説明です説明です説明です
          説明です説明です説明です説明です説明です説明です説明です説明です説明です説明です説明です
          説明です説明です説明です説明です説明です説明です説明です説明です説明です説明です
          説明です説明です説明です説明です説明です説明です説明です説明です説明です説明です説明です
          説明です説明です説明です説明です説明です説明です説明です説明です説明です説明です説明です
        </p>
      </div>
    </div>
  );
};
