import { Heading } from '../../components/Heading';
import { CorpList } from './CorpList';
import { ImageItem, TextItem } from '../../../types/type';

type Props = {
  imageData: ImageItem[];
  textData: TextItem[];
};

export default function CorporationPage({ imageData, textData }: Props) {
  return (
    <section>
      <Heading title="企業・団体様出展" />
      <CorpList imageData={imageData} textData={textData} />
    </section>
  );
}
