import { Heading } from '@/components/Heading';
import { Firework } from './Firework';
import { ImageItem, TextItem } from '@/types/type';

type Props = {
  imageData: ImageItem[];
  textData: TextItem[];
};

export default function FireworkPage({imageData, textData}: Props) {
  return (
    <section className="bg-umenobe-yellow" id="firework">
      <Heading title="打ち上げ花火" />
      <Firework imageData={imageData} textData={textData} />
    </section>
  );
}
