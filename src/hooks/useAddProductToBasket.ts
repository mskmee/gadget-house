import { useActions } from '@/hooks/useActions';
import { IProductCard } from '@/interfaces/interfaces';
import { toast } from 'react-toastify';

export const useAddProductToBasket = () => {
  const { addToStore } = useActions();

  const addProductToBasket = (product: IProductCard): void => {
    addToStore(product);
    toast.success('The product has been successfully added to your cart!', {
      position: 'top-center',
      type: 'success',
      autoClose: 4000,
      theme: 'dark',
    });
  };
  return { addProductToBasket };
};
