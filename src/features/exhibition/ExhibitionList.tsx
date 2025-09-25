import { ImageItem, TextItem } from '@/types/type';
import { Exhibition } from './Exhibition';

type Props = {
  imageData: ImageItem[];
  textData: TextItem[];
};

export const ExhibitionList = ({ imageData, textData }: Props) => (
  <div className="p-4 flex flex-col items-center justify-center gap-8">
    <Exhibition imageData={imageData} textData={textData} />
    <Exhibition imageData={imageData} textData={textData} />
    <Exhibition imageData={imageData} textData={textData} />
  </div>
);
