import { useEffect, useState } from 'react';
import { ImageItem, TextItem } from '@/types/type';

type Props = {
  imageData: ImageItem[];
  textData: TextItem[];
};

export const Corp = ({ imageData, textData }: Props) => {
  const [corpImage, setCorpImage] = useState<string | null>();
  const [corpName, setCorpName] = useState<string | null>(null);
  const [corpInfo, setCorpInfo] = useState<string | null>(null);

  useEffect(() => {
    const img = imageData.find((item) => item.name === 'image2');
    const loadImage = async () => {
      if (img && img.filename) {
        const url = (process.env.NEXT_PUBLIC_API_BASE_URL || '') + img.filename;
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error('画像の取得に失敗しました');
          const blob = await res.blob();
          const objectURL = URL.createObjectURL(blob);
          setCorpImage(objectURL);
        } catch (err) {
          // 失敗した場合は直接URLをセット（CDN直参照 fallback）
          setCorpImage(url);
        }
      }
    };
    const name = textData.find((item) => item.name === 'CultureDepartment_0');
    if (name && name.text) {
      setCorpName(name.text);
    }
    const info = textData.find((item) => item.name === 'CultureDepartment_1');
    if (info && info.text) {
      setCorpInfo(info.text);
    }
    loadImage();
  }, [imageData, textData]);

  return (
    <div className="bg-umenobe-yellow w-4/5 sm:w-2/3 p-8 flex flex-col justify-center items-center gap-4 sm:gap-8 mb-8 rounded-md">
      <div className="flex justify-center items-center w-1/2 border-8 border-white">
        {corpImage && (
          <img
            src={corpImage}
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
            {corpName}
          </h1>
        </div>
        {corpName && (
          <p className="my-4 tracking-widest">
            <span className="bg-umenobe-lightblue px-3 py-1 rounded-sm mr-2">
              場所
            </span>
            {corpName}
          </p>
        )}
        {corpName && (
          <p className="my-4 tracking-widest">
            <span className="bg-umenobe-lightblue px-3 py-1 rounded-sm mr-2">
              時間
            </span>
            {corpName}
          </p>
        )}
        <p>
          {corpInfo}
          ゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介です
        </p>
        {corpName && (
          <p className="my-4 tracking-widest">
            <span className="py-1 rounded-sm">住所：</span>
            {corpName}
          </p>
        )}
        {corpName && (
          <p className="my-4 tracking-widest">
            <span className="py-1 rounded-sm">HP：</span>
            <a href="#">{corpName}</a>
          </p>
        )}
      </div>
    </div>
  );
};
