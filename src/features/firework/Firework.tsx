import Image from 'next/image';
import { useEffect, useState } from 'react';

const imageData = '4e93b89ed6e5439e9ab712b340875ed4.png';

export const Firework = () => {
  const [fireworkImage, setFireworkImage] = useState<string>('');
  useEffect(() => {
    const url = (process.env.NEXT_PUBLIC_API_BASE_URL || '') + imageData;
    setFireworkImage(url);
  }, [imageData]);

  return (
    <div className="flex flex-col items-center pb-8">
      <div className="flex flex-col items-center justify-center gap-8 py-8">
        <div className="w-1/2">
          {fireworkImage && <Image
            src={fireworkImage}
            alt="打ち上げ花火"
            width={600}
            height={400}
            className="rounded-md"
          />}
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
