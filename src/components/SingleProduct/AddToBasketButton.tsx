import { BasketIcon } from '@/assets/icons/BasketIcon';
import styles from './Product.module.scss';
import { useAddProductToBasket } from '@/hooks/useAddProductToBasket';
import { FC, MouseEvent } from 'react';
import { IProductCard } from '@/interfaces/interfaces';

interface IAddToBasketButtonProps {
  product: IProductCard;
  onAddToBasket?: () => void;
}

export const AddToBasketButton: FC<IAddToBasketButtonProps> = ({
  product,
  onAddToBasket,
}) => {
  const { addProductToBasket } = useAddProductToBasket();

  const addToBasket = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addProductToBasket(product);
    onAddToBasket?.();
  };
  return (
    <button className={styles.AddToBasketButton} onClick={addToBasket}>
      <BasketIcon />
      <span>Add to basket</span>
    </button>
  );
};
