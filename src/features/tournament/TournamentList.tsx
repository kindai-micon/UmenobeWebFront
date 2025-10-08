import { EventItem, ImageItem, JointEventItem, TextItem } from '@/types/type';
import { JointEvent } from './JointEvent';
import { Tournament } from './Tournament';
import { useEffect, useState } from 'react';

type Props = {
  imageData: ImageItem[];
  textData: TextItem[];
};

export function TournamentList({imageData, textData}: Props) {
  const [eventList, setEventList] = useState<
        EventItem[]
      >([]);
  const [jointEventList, setJointEventList] = useState<
        JointEventItem[]
      >([]);

      const mergeByFilename = (images: ImageItem[], texts: TextItem[], sw: string) => {
                const companyImages = images.filter((item) => item.name.startsWith(sw));
                const companyTexts = texts.filter((item) => item.name.startsWith(sw));
                // filenameごとにグループ化
                const grouped: Record<string, { images: ImageItem[]; texts: TextItem[] }> = {};
            
                // helper to create group key like `exhibition_1` from names like `exhibition_name_1` or `exhibition_desc_1`
                const groupKeyForName = (name: string | undefined | null, idx: number) => {
                  if (typeof name === 'string') {
                    const trimmed = name.trim();
                    if (trimmed.length > 0 && trimmed !== 'undefined' && trimmed !== 'null') {
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
                  return `${sw}_id_${idx + 1}`;
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
                const event = mergeByFilename(imageData, textData, 'event');
                const jointEvent = mergeByFilename(imageData, textData, 'joint_event');
                setEventList(event);
                setJointEventList(jointEvent);
              }, [textData, imageData]);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-8 mb-8 xl:max-w-6xl mx-auto">
        {
          eventList.length === 0 ? (
            <div className="text-gray-500">イベントデータがありません</div>
          ) : (
            eventList.map((group) => (
              <Tournament key={group.name} imageData={group.images} textData={group.texts} />
            ))
          )
        }
      </div>
      <div className="flex flex-col items-center gap-8 py-8">
        {
          jointEventList.length === 0 ? (
            <div className="text-gray-500">合同イベントデータがありません</div>
          ) : (
            jointEventList.map((group) => (
              <JointEvent key={group.name} imageData={group.images} textData={group.texts} />
            ))
          )
        }
      </div>
    </div>
  )
}
