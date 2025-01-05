import { createContext } from 'react';

interface BasketPopupContextType {
  isBasketPopupOpen: boolean;
  openBasketPopup: () => void;
  closeBasketPopup: () => void;
  selectedProductId: number | null;
}

const defaultBasketPopupContext = {
  isBasketPopupOpen: false,
  openBasketPopup: () => {},
  closeBasketPopup: () => {},
  selectedProductId: null,
};
export const BasketPopupContext = createContext<BasketPopupContextType>(
  defaultBasketPopupContext,
);
