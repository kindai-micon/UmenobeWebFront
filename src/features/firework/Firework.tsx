import { ImageItem, TextItem } from '@/types/type';
import { useEffect, useState } from 'react';

type Props = {
  imageData: ImageItem[];
  textData: TextItem[];
};

export const Firework = ({imageData, textData}: Props) => {
  const [fireworkImage, setFireworkImage] = useState<string>('');
  const [fireworkDesc, setFireworkDesc] = useState<string>('');
  const [fireworkLocation, setFireworkLocation] = useState<string>('');
  const [fireworkTime, setFireworkTime] = useState<string>('');
  const [fireworkNotice, setFireworkNotice] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    const loadImage = async () => {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const fireworkImg = imageData.find(item => item.name === 'firework_image');
      const url = `${API_BASE_URL}${fireworkImg?.filename}`;
      setFireworkDesc(textData.find(item => item.name === 'firework_desc')?.text);
      setFireworkLocation(textData.find(item => item.name === 'firework_location')?.text);
      setFireworkTime(textData.find(item => item.name === 'firework_time')?.text);
      setFireworkNotice(textData.find(item => item.name === 'firework_notice')?.text);
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
          if (fireworkImage && fireworkImage.startsWith('blob:')) {
            URL.revokeObjectURL(fireworkImage);
          }
          // 新しいObjectURLを作成
          const objectURL = URL.createObjectURL(blob);
          setFireworkImage(objectURL);
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
        if (fireworkImage && fireworkImage.startsWith('blob:')) {
          URL.revokeObjectURL(fireworkImage);
        }
      };
    }, [imageData]);

  return (
    <div className="flex flex-col items-center pb-4 lg:pb-8">
      <div className="flex flex-col items-center justify-center gap-4 lg:gap-8 lg:py-4">
        <div className="w-2/3 lg:w-1/2">
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
          {
            fireworkDesc && (
              <p className="text-lg sm:text-2xl font-bold mb-2">
                {fireworkDesc}
              </p>
            )
          }
          <div className="flex flex-col items-start gap-4">
            {fireworkLocation && (
            <p className="tracking-widest">
              <span className="bg-umenobe-lightblue px-3 py-1 rounded-sm mr-2">
                観覧場所
              </span>
              {fireworkLocation}
            </p>
            )}
            {fireworkTime && (
            <p className="tracking-widest">
              <span className="bg-umenobe-lightblue px-3 py-1 rounded-sm mr-2">
                開始時刻
              </span>
              {fireworkTime}
            </p>
            )}
          </div>
        </div>
      </div>
      <div className="w-2/3 lg:w-1/2 pb-4">
        <h2 className="text-2xl font-bold text-center py-8 tracking-widest font-dela-one text-umenobe-dark-blue">
          注意事項
        </h2>
        <p>
          {fireworkNotice}
        </p>
      </div>
    </div>
  );
};
