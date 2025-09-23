type Props = {
  imageData: string;
  textData: string;
};

export const Shop = ({ imageData, textData }: Props) => (
    <div>
      <h1>{imageData}</h1>
      <h1>{textData}</h1>
    </div>
);
