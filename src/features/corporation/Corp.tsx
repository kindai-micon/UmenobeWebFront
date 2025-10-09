import { useEffect, useState } from "react";
import { ImageItem, TextItem } from "@/types/type";

type Props = {
  imageData: ImageItem[];
  textData: TextItem[];
};

export const Corp = ({ imageData, textData }: Props) => {
  const [corpImage, setCorpImage] = useState<string | null>();
  const [corpName, setCorpName] = useState<string | null>(null);
  const [corpDesc, setCorpDesc] = useState<string | null>(null);
  const [corpTime, setCorpTime] = useState<string | null>(null);
  const [corpLocation, setCorpLocation] = useState<string | null>(null);
  const [corpWeb, setCorpWeb] = useState<string | null>(null);
  const [corpAddress, setCorpAddress] = useState<string | null>(null);
  const [corpTel, setCorpTel] = useState<string | null>(null);
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
          corpImage &&
          typeof corpImage === "string" &&
          corpImage.startsWith("blob:")
        ) {
          URL.revokeObjectURL(corpImage);
        }

        const objectURL = URL.createObjectURL(blob);
        setCorpImage(objectURL);
        setImageError(false);
      } catch (err) {
        console.error("画像の取得に失敗しました:", err);
        setImageError(true);
      } finally {
        setIsLoading(false);
      }
    };

    const corpImg = imageData[0] || null;
    if (corpImg) {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${API_BASE_URL}${corpImg.filename}`;
      fetchImageAsBlob(url);
    }
    const name = textData.find((item) => item.name.startsWith("company_name"));
    if (name && name.text) {
      setCorpName(name.text);
    }
    const desc = textData.find((item) => item.name.startsWith("company_desc"));
    if (desc && desc.text) {
      setCorpDesc(desc.text);
    }
    const time = textData.find((item) => item.name.startsWith("company_time"));
    if (time && time.text) {
      setCorpTime(time.text);
    }
    const location = textData.find((item) =>
      item.name.startsWith("company_location"),
    );
    if (location && location.text) {
      setCorpLocation(location.text);
    }
    const web = textData.find((item) =>
      item.name.startsWith("company_website"),
    );
    if (web && web.text) {
      setCorpWeb(web.text);
    }
    const address = textData.find((item) =>
      item.name.startsWith("company_address"),
    );
    if (address && address.text) {
      setCorpAddress(address.text);
    }
    const tel = textData.find((item) => item.name.startsWith("company_tel"));
    if (tel && tel.text) {
      setCorpTel(tel.text);
    }
  }, [imageData, textData]);

  return (
    <div className="bg-umenobe-yellow w-4/5 sm:w-2/3 p-8 flex flex-col justify-center items-center gap-4 sm:gap-8 mb-8 rounded-md">
      <div className="flex justify-center items-center border-8 border-white md:w-2/3">
        {corpImage && (
          <img
            src={corpImage}
            alt="ゲスト画像"
            className="w-full h-auto object-cover rounded-md"
          />
        )}
      </div>
      <div className="w-4/5 md:w-2/3">
        <div className="py-2">
          <h1 className="border-b-4 border-dotted border-umenobe-lightblue inline text-2xl font-bold">
            {corpName}
          </h1>
        </div>
        {corpLocation && (
          <p className="my-4 tracking-widest">
            <span className="bg-umenobe-lightblue px-3 py-1 rounded-sm mr-2">
              場所
            </span>
            {corpLocation}
          </p>
        )}
        {corpTime && (
          <p className="my-4 tracking-widest">
            <span className="bg-umenobe-lightblue px-3 py-1 rounded-sm mr-2">
              時間
            </span>
            {corpTime}
          </p>
        )}
        <p>{corpDesc}</p>
        {corpAddress && (
          <p className="my-4 tracking-widest">
            <span className="py-1 rounded-sm">住所：</span>
            {corpAddress}
          </p>
        )}
        {corpTel && (
          <p className="my-4 tracking-widest">
            <span className="py-1 rounded-sm">電話：</span>
            {corpTel}
          </p>
        )}
        {corpWeb && (
          <p className="my-4 tracking-widest">
            <span className="py-1 rounded-sm">HP：</span>
            <a href={corpWeb}>{corpWeb}</a>
          </p>
        )}
      </div>
    </div>
  );
};
