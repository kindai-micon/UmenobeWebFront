import { ImageItem } from "@/types/type";
import { useEffect, useState } from "react";

type Props = {
  imageData: ImageItem[];
};

export default function KeyVisualPage({ imageData }: Props) {
  const [kvImage, setKvImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    const loadImage = async () => {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const themeImg = imageData.find((item) => item.name === "theme_image");
      const url = `${API_BASE_URL}${themeImg?.filename}`;
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
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          throw new Error("画像ではなくJSONが返されました");
        }
        // 画像をblobとして取得
        const blob = await res.blob();
        // 既存のObjectURLがあればrevoke
        if (kvImage && kvImage.startsWith("blob:")) {
          URL.revokeObjectURL(kvImage);
        }
        // 新しいObjectURLを作成
        const objectURL = URL.createObjectURL(blob);
        setKvImage(objectURL);
        setImageError(false);
      } catch (err) {
        console.error("画像の取得に失敗しました:", err);
        setImageError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadImage();

    // cleanup関数でObjectURLをrevoke
    return () => {
      if (kvImage && kvImage.startsWith("blob:")) {
        URL.revokeObjectURL(kvImage);
      }
    };
  }, [imageData]);

  return (
    <section className="bg-umenobe-yellow">
      <img
        src={kvImage}
        alt="大学祭のテーマ画像です"
        width={0}
        height={0}
        sizes="100%"
        style={{ width: "100%", height: "auto" }}
      />
      <div className="p-5">
        <div className="bg-umenobe-enpha-orange sm:py-1 px-2 sm:px-3 inline-block">
          <h2 className="font-dela-one text-xl sm:text-4xl tracking-widest text-white stroke-text">
            近畿大学工学部大学祭
          </h2>
        </div>
        <div>
          <h1 className="m-1 font-dela-one text-3xl sm:text-6xl tracking-widest text-umenobe-enpha-orange">
            第67回 うめの辺祭
          </h1>
        </div>
      </div>
    </section>
  );
}
