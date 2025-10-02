import { useEffect, useState } from 'react';

type Props = {
  imageData: string;
  textData: string;
};

export const Tournament = ({ imageData, textData }: Props) => {
  const [guestImage, setGuestImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    const loadImage = async () => {
      if (!imageData) {
        // デフォルト画像をfetchして設定
        await fetchImageAsBlob('/appare.jpg');
        return;
      }

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

      if (!API_BASE_URL) {
        // API_BASE_URLが設定されていない場合は、publicディレクトリから画像を取得
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

        // フォールバック画像をfetchして表示
        // if (url !== '/appare.jpg') {
        //   await fetchImageAsBlob('/appare.jpg');
        // }
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
  }, [imageData]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {isLoading ? (
          <div className="w-[300px] h-[200px] bg-gray-200 border-5 border-umenobe-orange rounded-md flex items-center justify-center">
            <span className="text-gray-500 text-sm">読み込み中...</span>
          </div>
        ) : guestImage ? (
          <img
            src={guestImage}
            alt="大会画像"
            width={300}
            height={200}
            className="border-5 border-umenobe-orange rounded-md object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-[300px] h-[200px] bg-gray-200 border-5 border-umenobe-orange rounded-md flex items-center justify-center">
            <span className="text-gray-500 text-sm">
              {imageError ? '画像の取得に失敗' : '画像がありません'}
            </span>
          </div>
        )}
      </div>
      <p className="w-[300px] text-center mt-1 text-bold">{textData}</p>
      <p className="w-[300px] text-center mt-1 text-bold">{textData}</p>
    </div>
  );
};
