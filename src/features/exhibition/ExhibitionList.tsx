import { ExhibitItem, ImageItem, TextItem } from "@/types/type";
import { useEffect, useState } from "react";
import { Exhibition } from "./Exhibition";

type Props = {
  imageData: ImageItem[];
  textData: TextItem[];
};

export function ExhibitionList({ imageData, textData }: Props) {
  // 各 filename ごとに { filename, images: ImageItem[], texts: TextItem[] } の配列を保持する
  const [exhibitionList, setExhibitionList] = useState<ExhibitItem[]>([]);

  const mergeByFilename = (images: ImageItem[], texts: TextItem[]) => {
    const exhibitionImages = images.filter((item) =>
      item.name.startsWith("exhibition"),
    );
    const exhibitionTexts = texts.filter((item) =>
      item.name.startsWith("exhibition"),
    );
    // filenameごとにグループ化
    const grouped: Record<string, { images: ImageItem[]; texts: TextItem[] }> =
      {};

    // helper to create group key like `exhibition_1` from names like `exhibition_name_1` or `exhibition_desc_1`
    const groupKeyForName = (name: string | undefined | null, idx: number) => {
      if (typeof name === "string") {
        const trimmed = name.trim();
        if (
          trimmed.length > 0 &&
          trimmed !== "undefined" &&
          trimmed !== "null"
        ) {
          // match first segment (exhibition) and trailing digits
          // examples:
          // - exhibition_1 => ['exhibition_1', 'exhibition', '1']
          // - exhibition_name_1 => ['exhibition_name_1', 'exhibition', '1']
          const m = trimmed.match(/^([^_]+)(?:.*_)?(\d+)$/);
          if (m && m[1] && m[2]) {
            return `${m[1]}_${m[2]}`; // e.g. exhibition_1
          }
          // if no trailing digits, fallback to trimmed name
          if (trimmed.length > 0) return trimmed;
        }
      }
      return `exhibition_id_${idx + 1}`;
    };

    // image要素を追加 — name のベースでグループ化する
    exhibitionImages.forEach((img, i) => {
      const key = groupKeyForName(img.name, i);
      if (!grouped[key]) grouped[key] = { images: [], texts: [] };
      grouped[key].images.push(img);
    });

    // text要素を追加 — name のベースでグループ化する
    exhibitionTexts.forEach((txt, i) => {
      const key = groupKeyForName(txt.name, i + exhibitionImages.length);
      if (!grouped[key]) grouped[key] = { images: [], texts: [] };
      grouped[key].texts.push(txt);
    });

    // filenameごとの配列を抽出して返す
    return Object.keys(grouped).map((k) => ({ name: k, ...grouped[k] }));
  };

  useEffect(() => {
    const exList = mergeByFilename(imageData, textData);
    setExhibitionList(exList);
  }, [textData, imageData]);

  return (
    <div className="p-4 flex flex-col items-center justify-center gap-8">
      {exhibitionList.length === 0 ? (
        <div className="text-gray-500">展示データがありません</div>
      ) : (
        exhibitionList.map((group) => (
          <Exhibition
            key={group.name}
            imageData={group.images}
            textData={group.texts}
          />
        ))
      )}
    </div>
  );
}
