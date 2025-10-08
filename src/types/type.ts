export type ImageItem = { [key: string]: string };

export type TextItem = { [key: string]: string };

export type ExhibitItem = {
  name: string;
  images: ImageItem[];
  texts: TextItem[];
};

export type CorpItem = { name: string; images: ImageItem[]; texts: TextItem[] };

export type ShopItem = { name: string; images: ImageItem[]; texts: TextItem[] };

export type EventItem = {
  name: string;
  images: ImageItem[];
  texts: TextItem[];
};

export type JointEventItem = {
  name: string;
  images: ImageItem[];
  texts: TextItem[];
};

export type TimeTableItem = {
  time: string;
  title: string;
  location: string;
};
