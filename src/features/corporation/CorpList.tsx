import { CorpItem, ImageItem, TextItem } from '@/types/type';
import { useEffect, useState } from 'react';
import { Corp } from './Corp';

type Props = {
  imageData: ImageItem[];
  textData: TextItem[];
};

export function CorpList({ imageData, textData }: Props) {
  const [corpList, setCorpList] = useState<CorpItem[]>([]);

  const mergeByFilename = (images: ImageItem[], texts: TextItem[]) => {
    const companyImages = images.filter((item) => item.name.startsWith('company'));
    const companyTexts = texts.filter((item) => item.name.startsWith('company'));
    // filenameごとにグループ化
    const grouped: Record<string, { images: ImageItem[]; texts: TextItem[] }> = {};

    // helper to create group key like `exhibition_1` from names like `exhibition_name_1` or `exhibition_desc_1`
    const groupKeyForName = (name: string | undefined | null, idx: number) => {
      if (typeof name === 'string') {
        const trimmed = name.trim();
        if (
          trimmed.length > 0
          && trimmed !== 'undefined'
          && trimmed !== 'null'
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
      return `company_id_${idx + 1}`;
    };

    // image要素を追加 — name のベースでグループ化する
    companyImages.forEach((img, i) => {
      const key = groupKeyForName(img.name, i);
      if (!grouped[key]) grouped[key] = { images: [], texts: [] };
      grouped[key].images.push(img);
    });

    // text要素を追加 — name のベースでグループ化する
    companyTexts.forEach((txt, i) => {
      const key = groupKeyForName(txt.name, i + companyImages.length);
      if (!grouped[key]) grouped[key] = { images: [], texts: [] };
      grouped[key].texts.push(txt);
    });

    // filenameごとの配列を抽出して返す
    return Object.keys(grouped).map((k) => ({ name: k, ...grouped[k] }));
  };

  useEffect(() => {
    const corpList = mergeByFilename(imageData, textData);
    setCorpList(corpList);
  }, [textData, imageData]);

  return (
    <div className="p-4 flex flex-col items-center justify-center gap-8">
      {corpList.length === 0 ? (
        <div className="text-gray-500">展示データがありません</div>
      ) : (
        corpList.map((group) => (
          <Corp
            key={group.name}
            imageData={group.images}
            textData={group.texts}
          />
        ))
      )}
    </div>
  );
}
