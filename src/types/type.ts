export type ImageItem = { [key: string]: string };

export type TextItem = { [key: string]: string };

export type ExhibitItem = { name: string; images: ImageItem[]; texts: TextItem[] };

export type CorpItem = { name: string; images: ImageItem[]; texts: TextItem[] };

export type FileItem = { name: string; filename: string };

export type MergedItem = { name: string; filename: string; text: string };

export type ShopItem = { imageData: string; textData: string };
