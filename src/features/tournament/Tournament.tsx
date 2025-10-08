import { ImageItem, TextItem } from '@/types/type';
import { useEffect, useState } from 'react';

type Props = {
  imageData: ImageItem[];
  textData: TextItem[];
};

export const Tournament = ({ imageData, textData }: Props) => {
  const [eventImage, setEventImage] = useState<string | null>();
  const [eventName, setEventName] = useState<string | null>(null);
  const [eventDesc, setEventDesc] = useState<string | null>(null);
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

        if (
          eventImage
          && typeof eventImage === 'string'
          && eventImage.startsWith('blob:')
        ) {
          URL.revokeObjectURL(eventImage);
        }

        const objectURL = URL.createObjectURL(blob);
        setEventImage(objectURL);
        setImageError(false);
      } catch (err) {
        console.error('画像の取得に失敗しました:', err);
        setImageError(true);
      } finally {
        setIsLoading(false);
      }
    };

    const eventImg = imageData[0] || null;
    if (eventImg) {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${API_BASE_URL}${eventImg.filename}`;
      fetchImageAsBlob(url);
    }
    const name = textData.find((item) => item.name.startsWith('event_name'));
    if (name && name.text) {
      setEventName(name.text);
    }
    const desc = textData.find((item) => item.name.startsWith('event_desc'));
    if (desc && desc.text) {
      setEventDesc(desc.text);
    }
  }, [imageData, textData]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {isLoading ? (
          <div className="w-[300px] h-[200px] bg-gray-200 border-5 border-umenobe-orange rounded-md flex items-center justify-center">
            <span className="text-gray-500 text-sm">読み込み中...</span>
          </div>
        ) : eventImage ? (
          <img
            src={eventImage}
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
      <p className="w-[300px] text-center mt-1 text-lg font-bold">
        {eventName}
      </p>
      <p className="w-[300px] text-center mt-1">{eventDesc}</p>
    </div>
  );
};
