import { useEffect, useState } from 'react';
import { ImageItem, TextItem } from '@/types/type';

type Props = {
  imageData: ImageItem[];
  textData: TextItem[];
};

export const Exhibition = ({ imageData, textData }: Props) => {
  const [exhibitImage, setExhibitImage] = useState<string | null>();
  const [exhibitName, setExhibitName] = useState<string | null>(null);
  const [exhibitInfo, setExhibitInfo] = useState<string | null>(null);
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
          exhibitImage
          && typeof exhibitImage === 'string'
          && exhibitImage.startsWith('blob:')
        ) {
          URL.revokeObjectURL(exhibitImage);
        }

        const objectURL = URL.createObjectURL(blob);
        setExhibitImage(objectURL);
        setImageError(false);
      } catch (err) {
        console.error('画像の取得に失敗しました:', err);
        setImageError(true);
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
      setExhibitName(name.text);
    }
    const info = textData.find((item) => item.name === 'CultureDepartment_1');
    if (info && info.text) {
      setExhibitInfo(info.text);
    }
  }, [imageData, textData]);

  return (
    <div className="w-4/5 sm:w-2/3 p-8 bg-white flex flex-col justify-center items-center gap-4 sm:gap-8 mb-8 rounded-md">
      <div className="flex justify-center items-center w-1/2">
        {exhibitImage && (
          <img
            src={exhibitImage}
            alt="ゲスト画像"
            width={0}
            height={0}
            sizes="100%"
            style={{ width: '100%', height: 'auto' }}
          />
        )}
      </div>
      <div className="w-4/5 sm:w-1/2">
        <div className="py-2">
          <h1 className="border-b-4 border-dotted border-umenobe-lightblue inline text-2xl font-bold">
            {exhibitName}
          </h1>
        </div>
        {exhibitName && (
          <p className="my-4 tracking-widest">
            <span className="bg-umenobe-lightblue px-3 py-1 rounded-sm mr-2">
              場所
            </span>
            {exhibitName}
          </p>
        )}
        {exhibitName && (
          <p className="my-4 tracking-widest">
            <span className="bg-umenobe-lightblue px-3 py-1 rounded-sm mr-2">
              時間
            </span>
            {exhibitName}
          </p>
        )}
        <p>
          {exhibitInfo}
          ゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介です
        </p>
        {exhibitName && (
          <p className="my-4 tracking-widest">
            <span className="py-1 rounded-sm">HP：</span>
            <a href="#">{exhibitName}</a>
          </p>
        )}
      </div>
    </div>
  );
};
