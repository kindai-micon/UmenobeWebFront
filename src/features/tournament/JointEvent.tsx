import { ImageItem, TextItem } from '@/types/type';
import { useEffect, useState } from 'react';

type Props = {
  imageData: ImageItem[];
  textData: TextItem[];
};

export const JointEvent = ({ imageData, textData }: Props) => {
  const [jointEventImage, setJointEventImage] = useState<string | null>();
  const [jointEventName, setJointEventName] = useState<string | null>(null);
  const [jointEventDesc, setJointEventDesc] = useState<string | null>(null);
  const [jointEventCatch, setJointEventCatch] = useState<string | null>(null);
  const [jointEventTime, setJointEventTime] = useState<string | null>(null);
  const [jointEventLocation, setJointEventLocation] = useState<string | null>(
    null,
  );
  const [jointEventWeb, setJointEventWeb] = useState<string | null>(null);
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
          jointEventImage
          && typeof jointEventImage === 'string'
          && jointEventImage.startsWith('blob:')
        ) {
          URL.revokeObjectURL(jointEventImage);
        }

        const objectURL = URL.createObjectURL(blob);
        setJointEventImage(objectURL);
        setImageError(false);
      } catch (err) {
        console.error('画像の取得に失敗しました:', err);
        setImageError(true);
      } finally {
        setIsLoading(false);
      }
    };

    const jointEventImg = imageData[0] || null;
    if (jointEventImg) {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${API_BASE_URL}${jointEventImg.filename}`;
      fetchImageAsBlob(url);
    }
    const name = textData.find((item) => item.name.startsWith('joint_event_name'));
    if (name && name.text) {
      setJointEventName(name.text);
    }
    const desc = textData.find((item) => item.name.startsWith('joint_event_desc'));
    if (desc && desc.text) {
      setJointEventDesc(desc.text);
    }
    const copy = textData.find((item) => item.name.startsWith('joint_event_catch'));
    if (copy && copy.text) {
      setJointEventCatch(copy.text);
    }
    const time = textData.find((item) => item.name.startsWith('joint_event_time'));
    if (time && time.text) {
      setJointEventTime(time.text);
    }
    const location = textData.find((item) => item.name.startsWith('joint_event_location'));
    if (location && location.text) {
      setJointEventLocation(location.text);
    }
    const web = textData.find((item) => item.name.startsWith('joint_event_website'));
    if (web && web.text) {
      setJointEventWeb(web.text);
    }
  }, [imageData, textData]);

  return (
    <div className="w-4/5 lg:w-1/2 p-4 sm:p-8 bg-white flex flex-col justify-center items-center gap-4 sm:gap-8 rounded-md">
      <div className="flex justify-center items-center w-2/3 mt-4 sm:mt-0">
        {isLoading ? (
          <div className="w-full h-32 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-gray-500 text-sm">読み込み中...</span>
          </div>
        ) : jointEventImage ? (
          <img
            src={jointEventImage}
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
      <div className="w-4/5">
        <div className="py-2">
          <h1 className="border-b-4 border-dotted border-umenobe-lightblue inline text-2xl font-bold">
            {jointEventName}
          </h1>
        </div>
        {jointEventLocation && (
          <p className="my-4 tracking-widest">
            <span className="bg-umenobe-lightblue px-3 py-1 rounded-sm mr-2">
              場所
            </span>
            {jointEventLocation}
          </p>
        )}
        {jointEventTime && (
          <p className="my-4 tracking-widest">
            <span className="bg-umenobe-lightblue px-3 py-1 rounded-sm mr-2">
              時間
            </span>
            {jointEventTime}
          </p>
        )}
        {jointEventCatch && (
          <p className="my-4 tracking-widest font-bold">{jointEventCatch}</p>
        )}
        <p>{jointEventDesc}</p>
        {jointEventWeb && (
          <p className="my-4 tracking-widest">
            <span className="py-1 rounded-sm">HP：</span>
            <a href="#">{jointEventWeb}</a>
          </p>
        )}
      </div>
    </div>
  );
};
