// utils
import { createSlice } from '@reduxjs/toolkit';
// assets
import phoneImage from '@/assets/images/phone-image.png';
// types
import type { CardSlice } from '@/types/slices.types';

// below is an example for features slices
export const initialState: CardSlice[] | null = [
  {
    name: 'Apple iPhone 15 Pro 256Gb Blue Titanium Apple iPhone 15 Pro 256Gb Blue Titanium',
    code: '874524',
    quantity: '1',
    price: '45999',
    href: phoneImage,
  },
  {
    name: 'Samsung Galaxy S23FE 8/128Gb Purple',
    code: '745785',
    quantity: '1',
    price: '22299',
    href: phoneImage,
  },
  {
    name: 'TWS Samsung Galaxy Buds2 Lavender',
    code: '874774',
    quantity: '1',
    price: '4299',
    href: phoneImage,
  },
  {
    name: 'TWS Samsung Galaxy Buds2 Lavender',
    code: '874775',
    quantity: '1',
    price: '4299',
    href: phoneImage,
  },
];

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    // reducers
  },
});

export default cardSlice.reducer;
