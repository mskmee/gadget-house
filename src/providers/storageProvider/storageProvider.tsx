import { useTypedSelector } from '@/hooks/useTypedSelector';
import {
  localStorageService,
  LocalStorageKey,
} from '@/utils/packages/local-storage';
import { FC, PropsWithChildren, useEffect } from 'react';

const StorageProvider: FC<PropsWithChildren> = ({ children }) => {
  const { cardTotalAmount, cardTotalQuantity, products } = useTypedSelector(
    (state) => state.shopping_card,
  );

  useEffect(() => {
    const saveDataToLocalStorage = () => {
      localStorageService.setItem(LocalStorageKey.CART_PRODUCTS, products);
      localStorageService.setItem(
        LocalStorageKey.CART_TOTAL_AMOUNT,
        cardTotalAmount,
      );
      localStorageService.setItem(
        LocalStorageKey.CART_QUANTITY,
        cardTotalQuantity,
      );
    };
    window.addEventListener('beforeunload', saveDataToLocalStorage);

    return () => {
      window.removeEventListener('beforeunload', saveDataToLocalStorage);
    };
  }, [cardTotalAmount, cardTotalQuantity, products]);

  return children;
};

export { StorageProvider };
