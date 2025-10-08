'use client';

import { ImageItem, TextItem } from '@/types/type';
import { useEffect, useState } from 'react';

type Props = {
  imageData: ImageItem[];
  textData: TextItem[];
};

export const YShop = ({ imageData, textData }: Props) => {
  const [shopImage, setShopImage] = useState<string | null>();
  const [shopName, setShopName] = useState<string | null>(null);
  const [shopMenu, setShopMenu] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    const fetchImageAsBlob = async (url: string) => {
      setIsLoading(true);
      setImageError(false);

      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          throw new Error('画像ではなくJSONが返されました');
        }

        const blob = await res.blob();

        if (
          shopImage
          && typeof shopImage === 'string'
          && shopImage.startsWith('blob:')
        ) {
          URL.revokeObjectURL(shopImage);
        }

        const objectURL = URL.createObjectURL(blob);
        setShopImage(objectURL);
        setImageError(false);
      } catch (err) {
        console.error('画像の取得に失敗しました:', err);
        setImageError(true);
      } finally {
        setIsLoading(false);
      }
    };

    const shopImg = imageData[0] || null;
    if (shopImg) {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${API_BASE_URL}${shopImg.filename}`;
      fetchImageAsBlob(url);
    }
    const name = textData.find((item) => item.name.startsWith('y_shop_name'));
    if (name && name.text) {
      setShopName(name.text);
    }
    const menu = textData.find((item) => item.name.startsWith('y_shop_menu'));
    if (menu && menu.text) {
      setShopMenu(menu.text);
    }
  }, [imageData, textData]);

  return (
    <div className="flex flex-col items-center">
      <div>
        {shopImage && (
          <img
            src={shopImage}
            alt="ショップ画像"
            width={125}
            height={200}
            className="border-5 border-umenobe-orange rounded-md"
          />
        )}
      </div>
      <p className="w-[200px] text-center mt-1 font-bold">{shopName}</p>
      <p>
        {shopMenu}
      </p>
    </div>
  );
};
