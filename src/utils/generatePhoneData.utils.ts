import { PhoneImg } from '@/assets/constants';
import {
  COLORS,
  BRANDS,
  CORES_OPTIONS,
  CAMERA_MP_OPTIONS,
} from '@/constants/generateFakeData.constants';
import type { Phone } from '@/types/generateFakeData.types';

const generateColors = (): string[] => {
  const colorCount = Math.floor(Math.random() * 4) + 1;
  const selectedColors: string[] = [];

  while (selectedColors.length < colorCount) {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    if (!selectedColors.includes(color)) {
      selectedColors.push(color);
    }
  }

  return selectedColors;
};

export const generatePhoneData = (count: number): Phone[] => {
  const phones: Phone[] = [];

  for (let i = 0; i < count; i++) {
    const phone: Phone = {
      name: `${
        BRANDS[Math.floor(Math.random() * BRANDS.length)]
      } Model ${Math.floor(Math.random() * 100)} ${
        ['V', 'X', 'Pro', 'Lite'][Math.floor(Math.random() * 4)]
      } ${Math.floor(Math.random() * 9) + 4}/${
        Math.floor(Math.random() * 200) + 64
      }GB`,
      code: `${Math.floor(Math.random() * 90_000_000) + 10_000_000}`,
      price: `${Math.floor(Math.random() * 46_000) + 4_000}`,
      href: PhoneImg,
      characteristics: {
        brand: BRANDS[Math.floor(Math.random() * BRANDS.length)],
        memory: `${Math.floor(Math.random() * 9) + 4}`,
        ram: `${Math.floor(Math.random() * 192) + 64}`,
        memory_card_slot: Math.random() > 0.5,
        colors: generateColors(),
        camera_mp:
          CAMERA_MP_OPTIONS[
            Math.floor(Math.random() * CAMERA_MP_OPTIONS.length)
          ],
        cores: CORES_OPTIONS[Math.floor(Math.random() * CORES_OPTIONS.length)],
      },
      rating: Math.floor(Math.random() * 5) + 1,
    };

    phones.push(phone);
  }

  return phones;
};
