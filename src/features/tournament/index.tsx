import { Heading } from '@/components/Heading';
import { TournamentList } from './TournamentList';
import { ImageItem, TextItem } from '@/types/type';

type Props = {
  imageData: ImageItem[];
  textData: TextItem[];
};

export default function Page({ imageData, textData }: Props) {
  return (
    <section className="bg-umenobe-yellow" id="tournament">
      <Heading title="イベント" />
      <TournamentList imageData={imageData} textData={textData} />
    </section>
  );
}
