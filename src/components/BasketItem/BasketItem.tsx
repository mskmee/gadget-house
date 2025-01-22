import styles from './basketitem.module.scss';
import { IShoppingCard } from '@/interfaces/interfaces.ts';
import { deleteFromBasket, deleteFromBasketMob } from '@/assets/constants.ts';
import { HeartIcon } from '@/assets/icons/HeartIcon.tsx';
import { useProductCardHandlers } from '@/hooks/useProductCardHandlers.ts';
import { useActions } from '@/hooks/useActions.ts';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { convertPriceToReadable } from '@/utils/helpers/product';

interface IBasketItemProps {
  product: IShoppingCard;
}
export default function BasketItem({ product }: IBasketItemProps) {
  const { id, title, code, images, quantity, totalPrice } = product;
  const { isLiked, handleClickLike } = useProductCardHandlers();
  const { deleteFromStore, increaseItemQuantity, decreaseItemQuantity } =
    useActions();
  const { locale, currency } = useTypedSelector((state) => state.shopping_card);

  return (
    <li className={styles.basketItem}>
      <div className={styles.productImg}>
        <img src={images?.[0].link} alt={title} />
      </div>
      <div className={styles.productInfo}>
        <p className={styles.productTitle}>{title}</p>
        <p className={styles.productCode}>code:{code}</p>
        <span className={styles.productBottom}>
          <button onClick={() => deleteFromStore(id)}>
            <img
              className={styles.productRemove}
              src={deleteFromBasket}
              alt="delete"
            />
            <img
              className={styles.productRemoveMob}
              src={deleteFromBasketMob}
              alt="delete"
            />
            <span>Delete</span>
          </button>
          <HeartIcon
            onClick={handleClickLike}
            isLiked={isLiked}
            type="basket"
          />
        </span>
      </div>
      <div className={styles.productTotals}>
        <div className={styles.productQuantity}>
          <button onClick={() => decreaseItemQuantity(id)}>-</button>
          <p>{quantity}</p>
          <button onClick={() => increaseItemQuantity(id)}>+</button>
        </div>
        <p className={styles.productPrice}>
          {convertPriceToReadable(totalPrice, currency, locale)}
        </p>
      </div>
    </li>
  );
}
