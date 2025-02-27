
import { useActions } from '@/hooks/useActions';
import { IProductCard } from '@/interfaces/interfaces';

export const useAddProductToBasket = () => {
  const { addToStore } = useActions();

  const addProductToBasket = (product: IProductCard): void => {
    addToStore(product);
  };
  return { addProductToBasket };
};
