import { XShop } from './XShop';
import { YShop } from './YShop';
import {
  ImageItem, TextItem, FileItem, MergedItem,
} from '../../../types/type';

type Props = {
  imageData: ImageItem[];
  textData: TextItem[];
};

export const ShopList = ({ imageData, textData }: Props) => {
  const shopList = (imageData, textData) => {
    const map = new Map<string, FileItem>();

    // file 側を Map に登録
    for (const img of imageData) {
      map.set(img.name, img);
    }

    // text 側をループして両方あるものだけ残す
    const merged: MergedItem[] = [];
    for (const txt of textData) {
      const img = map.get(txt.name);
      if (img) {
        merged.push({ name: txt.name, filename: img.filename, text: txt.text });
      }
    }

    return merged;
  };

  return (
    <>
      <ul className="mb-8 flex justify-center gap-8">
        {shopList(imageData, textData).map((item) => (
          <li key={item.name}>
            <XShop imageData={item.filename} textData={item.text} />
          </li>
        ))}
      </ul>
      <ul className="mb-8 flex justify-center gap-8">
        {shopList(imageData, textData).map((item) => (
          <li key={item.name}>
            <YShop imageData={item.filename} textData={item.text} />
          </li>
        ))}
      </ul>
    </>
  );
};
