import styles from './basketitem.module.scss';
import { IShoppingCard } from '@/interfaces/interfaces.ts';
import { deleteFromBasket } from '@/assets/constants.ts';
import { HeartIcon } from '@/assets/icons/HeartIcon.tsx';
import { useProductCardHandlers } from '@/hooks/useProductCardHandlers.ts';
import { useActions } from '@/hooks/useActions.ts';

interface IBasketItemProps {
  product: IShoppingCard | null;
}
export default function BasketItem({ product }: IBasketItemProps) {
  const { id, title, code, img, quantity, totalPrice } = product;
  const { isLiked, handleClickLike } = useProductCardHandlers();
  const { deleteFromStore,
          increaseItemQuantity,
          decreaseItemQuantity } = useActions();


  return (
    <li className={styles.basketItem}>
      <div className={styles.productImg}>
        <img src={img} alt={title} />
      </div>
      <div className={styles.productInfo}>
        <p className={styles.productTitle}>{title}</p>
        <p className={styles.productCode}>code:{code}</p>
        <span className={styles.productBottom}>
          <button onClick={() => deleteFromStore(id)}><img src={ deleteFromBasket } alt="delete" />Delete</button>
          <HeartIcon onClick={handleClickLike} isLiked={isLiked} type='basket' />
        </span>
      </div>
      <div className={styles.productTotals}>
        <div className={styles.productQuantity}>
          <button onClick={() => decreaseItemQuantity(id)}>-</button>
          <p>{quantity}</p>
          <button onClick={() => increaseItemQuantity(id)}>+</button>
        </div>
        <p className={styles.productPrice}>{totalPrice} ₴</p>
      </div>
    </li>
  )
}