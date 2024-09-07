import { createSlice } from '@reduxjs/toolkit';
import phoneImage from '@/assets/images/phone-image.png';
import type { CartItem } from '@/types/types';

type State = {
  cartItems: CartItem[];
};

const CART_ITEMS: CartItem[] = [
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

const initialState: State = {
  cartItems: CART_ITEMS,
};

const { name, actions, reducer } = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // reducers
  },
});

export { name, actions, reducer };
