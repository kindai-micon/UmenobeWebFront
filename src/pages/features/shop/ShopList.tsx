import { Shop } from './Shop';

type Props = {
  imageData: ImageItem[];
  textData: TextItem[];
};

const items = [
  { name: 'foo', file: '/images/foo.png', text: 'Foo text' },
  { name: 'bar', file: '/images/bar.png', text: 'Bar text' },
];

export const ShopList = ({ imageData, textData }: Props) => (
    <ul>
      {items.map((item) => (
        <li key={item.name}>
          <Shop imageData={item.file} textData={item.text} />
        </li>
      ))}
    </ul>
);
