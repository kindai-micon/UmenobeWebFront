import { ImageItem, TextItem } from '@/types/type';
import { Corp } from './Corp';

type Props = {
  imageData: ImageItem[];
  textData: TextItem[];
};

export const CorpList = ({ imageData, textData }: Props) => (
  <div className="p-4 flex flex-col items-center justify-center gap-8">
    <Corp imageData={imageData} textData={textData} />
    <Corp imageData={imageData} textData={textData} />
    <Corp imageData={imageData} textData={textData} />
  </div>
);
