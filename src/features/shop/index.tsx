import { Heading } from '@/components/Heading';
import { ShopList } from './ShopList';
import { ImageItem, TextItem } from '@/types/type';

type Props = {
  imageData: ImageItem[];
  textData: TextItem[];
};

export default function ShopPage({ imageData, textData }: Props) {
  return (
    <section id='shop'>
      <Heading title="出店" />
      <ShopList imageData={imageData} textData={textData} />
    </section>
  );
}
