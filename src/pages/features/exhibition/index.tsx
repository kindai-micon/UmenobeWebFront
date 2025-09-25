import { Heading } from '@/pages/components/Heading';
import { ImageItem, TextItem } from '@/types/type';
import { ExhibitionList } from './ExhibitionList';

type Props = {
  imageData: ImageItem[];
  textData: TextItem[];
};

export default function ExhibitionPage({ imageData, textData }: Props) {
  return (
    <section className="bg-umenobe-yellow" id='exhibition'>
      <Heading title="展示・発表" />
      <ExhibitionList imageData={imageData} textData={textData} />
    </section>
  );
}
