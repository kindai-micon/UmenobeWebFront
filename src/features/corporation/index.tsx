import { Heading } from "@/components/Heading";
import { ImageItem, TextItem } from "@/types/type";
import { CorpList } from "./CorpList";

type Props = {
  imageData: ImageItem[];
  textData: TextItem[];
};

export default function CorporationPage({ imageData, textData }: Props) {
  return (
    <section id="corporation">
      <Heading title="企業・団体様出展" />
      <CorpList imageData={imageData} textData={textData} />
    </section>
  );
}
