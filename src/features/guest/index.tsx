import { Heading } from "@/components/Heading";
import { ImageItem, TextItem } from "@/types/type";
import { Guest } from "./Guest";

type Props = {
  imageData: ImageItem[];
  textData: TextItem[];
};

export default function GuestPage({ imageData, textData }: Props) {
  return (
    <section className="flex flex-col items-center" id="guest">
      <Heading title="ゲスト情報" />
      <Guest imageData={imageData} textData={textData} />
    </section>
  );
}
