import { useEffect, useState } from "react";
import { ImageItem, TextItem } from "@/types/type";

type Props = {
  imageData: ImageItem[];
  textData: TextItem[];
};

export const Exhibition = ({ imageData, textData }: Props) => {
  const [exhibitImage, setExhibitImage] = useState<string | null>();
  const [exhibitName, setExhibitName] = useState<string | null>(null);
  const [exhibitDesc, setExhibitDesc] = useState<string | null>(null);
  const [exhibitTime, setExhibitTime] = useState<string | null>(null);
  const [exhibitLocation, setExhibitLocation] = useState<string | null>(null);
  const [exhibitWeb, setExhibitWeb] = useState<string | null>(null);
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

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          throw new Error("画像ではなくJSONが返されました");
        }

        const blob = await res.blob();

        if (
          exhibitImage &&
          typeof exhibitImage === "string" &&
          exhibitImage.startsWith("blob:")
        ) {
          URL.revokeObjectURL(exhibitImage);
        }

        const objectURL = URL.createObjectURL(blob);
        setExhibitImage(objectURL);
        setImageError(false);
      } catch (err) {
        console.error("画像の取得に失敗しました:", err);
        setImageError(true);
      } finally {
        setIsLoading(false);
      }
    };

    const exhibitImg = imageData[0] || null;
    if (exhibitImg) {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${API_BASE_URL}${exhibitImg.filename}`;
      fetchImageAsBlob(url);
    }
    const name = textData.find((item) =>
      item.name.startsWith("exhibition_name"),
    );
    if (name && name.text) {
      setExhibitName(name.text);
    }
    const desc = textData.find((item) =>
      item.name.startsWith("exhibition_desc"),
    );
    if (desc && desc.text) {
      setExhibitDesc(desc.text);
    }
    const time = textData.find((item) =>
      item.name.startsWith("exhibition_time"),
    );
    if (time && time.text) {
      setExhibitTime(time.text);
    }
    const location = textData.find((item) =>
      item.name.startsWith("exhibition_location"),
    );
    if (location && location.text) {
      setExhibitLocation(location.text);
    }
    const web = textData.find((item) =>
      item.name.startsWith("exhibition_website"),
    );
    if (web && web.text) {
      setExhibitWeb(web.text);
    }
  }, [imageData, textData]);

  return (
    <div className="w-4/5 sm:w-2/3 p-8 bg-white flex flex-col justify-center items-center gap-4 sm:gap-8 mb-8 rounded-md">
      <div className="flex justify-center items-center md:w-2/3">
        {exhibitImage && (
          <img
            src={exhibitImage}
            alt="展示画像"
            className="w-full h-auto object-cover rounded-md"
          />
        )}
      </div>
      <div className="w-4/5 sm:w-2/3">
        <div className="py-2">
          <h1 className="border-b-4 border-dotted border-umenobe-lightblue inline text-2xl font-bold">
            {exhibitName}
          </h1>
        </div>
        {exhibitLocation && (
          <p className="my-4 tracking-widest break-words">
            <span className="bg-umenobe-lightblue px-3 py-1 rounded-sm mr-2">
              場所
            </span>
            {exhibitLocation}
          </p>
        )}
        {exhibitTime && (
          <p className="my-4 tracking-widest break-words">
            <span className="bg-umenobe-lightblue px-3 py-1 rounded-sm mr-2">
              時間
            </span>
            {exhibitTime}
          </p>
        )}
        <p className="break-words">{exhibitDesc}</p>
        {exhibitWeb && (
          <p className="my-4 tracking-widest break-words">
            <span className="py-1 rounded-sm">HP：</span>
            <a
              href={exhibitWeb}
              className="break-all max-w-full inline-block underline underline-offset-4"
            >
              サイトはこちら
            </a>
          </p>
        )}
      </div>
    </div>
  );
};
