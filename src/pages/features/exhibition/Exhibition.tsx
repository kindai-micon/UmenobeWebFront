import Image from "next/image";
import { useEffect, useState } from "react";
import { ImageItem, TextItem } from "../../../types/type";

type Props = {
  imageData: ImageItem[];
  textData: TextItem[];
};

export const Exhibition = ({imageData, textData}: Props) => {
    const [exhibitImage, setExhibitImage] = useState<string | null>();
      const [exhibitName, setExhibitName] = useState<string | null>(null);
      const [exhibitInfo, setExhibitInfo] = useState<string | null>(null);
    
      useEffect(() => {
        const img = imageData.find((item) => item.name === 'image2');
        if (img && img.filename) {
          const url = (process.env.NEXT_PUBLIC_API_BASE_URL || '') + img.filename;
          setExhibitImage(url);
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
        <div className="w-1/2 p-8 bg-white flex gap-4 mb-8 rounded-md">
              <div className="flex justify-center items-center w-1/2">
                {exhibitImage && (
                  <Image
                    src={exhibitImage}
                    alt="ゲスト画像"
                    width={0}
                    height={0}
                    sizes="100%"
                    style={{ width: '100%', height: 'auto' }}
                  />
                )}
              </div>
              <div className="w-1/2">
                <div className="py-2">
                  <h1 className="border-b-4 border-dotted border-umenobe-lightblue inline text-2xl font-bold">{exhibitName}</h1>
                </div>
                <p className="my-4 tracking-widest">
                    <span className="bg-umenobe-lightblue px-3 py-1 rounded-sm mr-2">場所</span>
                    {exhibitName}
                </p>
                <p>
                  {exhibitInfo}
                  ゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介ですゲストの紹介です
                </p>
              </div>
            </div>
    );
}