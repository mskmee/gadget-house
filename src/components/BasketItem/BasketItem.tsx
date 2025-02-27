import styles from './basketitem.module.scss';
import { IShoppingCard } from '@/interfaces/interfaces.ts';
import {
  closeBasketPopupIcon,
  deleteFromBasketMob,
  quantityDecreaseButton,
  quantityInreaseButton,
} from '@/assets/constants.ts';
import { HeartIcon } from '@/assets/icons/HeartIcon.tsx';
import { useProductCardHandlers } from '@/hooks/useProductCardHandlers.ts';
import { useActions } from '@/hooks/useActions.ts';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { convertPriceToReadable } from '@/utils/helpers/product';
import { DeleteFromBasket } from '@/assets/icons/DeleteFromBasket';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { MouseEvent } from 'react';

interface IBasketItemProps {
  product: IShoppingCard;
}
export default function BasketItem({ product }: IBasketItemProps) {
  const { id, name, code, images, quantity, totalPrice, href, category } =
    product;

  const { isLiked, handleClickLike } = useProductCardHandlers();
  const {
    deleteFromStore,
    closeBasketPopup,
    increaseItemQuantity,
    decreaseItemQuantity,
  } = useActions();
  const { locale, currency } = useTypedSelector((state) => state.shopping_card);

  const isLessThan768px = useMediaQuery({
    query: '(max-width: 768px)',
  });

  const handleDeleteFromStore = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteFromStore(id);
  };
  const handleDecreaseItemQuantity = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (quantity > 1) {
      decreaseItemQuantity(id);
    } else {
      closeBasketPopup();
      decreaseItemQuantity(id);
    }
  };
  const handleIncrementItemQuantity = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    increaseItemQuantity(id);
  };

  return isLessThan768px ? (
    <Link to={`/${category}/${id}/${href}`} className={styles.mobilePopup}>
      <div className={styles.top}>
        <img src={images?.[0].link} alt={name} />
        <div>
          <h2 className={styles.mobilePopupTitle}>{name}</h2>
          <p className={styles.mobilePopupCode}>code:{code}</p>
        </div>
        <div>
          <button
            className={styles.mobilePopupClose}
            onClick={handleDeleteFromStore}
          >
            <img src={closeBasketPopupIcon} alt="close" />
          </button>
          <h3 className={styles.mobilePopupPrice}>
            {convertPriceToReadable(totalPrice, currency, locale)}
          </h3>
        </div>
      </div>
      <div className={styles.devider}></div>
      <div className={styles.bottom}>
        <div className={styles.mobilePopupQuantity}>
          <button onClick={handleDecreaseItemQuantity}>
            <img src={quantityDecreaseButton} alt="quantity-Decrease-Button" />
          </button>
          <p>{quantity}</p>
          <button onClick={handleIncrementItemQuantity}>
            <img src={quantityInreaseButton} alt="quantity-Inrease-Button" />
          </button>
        </div>
        <button>
          <HeartIcon onClick={handleClickLike} isLiked={isLiked} />
        </button>
      </div>
    </Link>
  ) : (
    <Link to={`/${category}/${id}/${href}`} className={styles.basketItem}>
      <div className={styles.productImg}>
        <img src={images?.[0].link} alt={name} />
      </div>
      <div className={styles.productInfo}>
        <h2 className={styles.productTitle}>{name}</h2>

        <p className={styles.productCode}>code:{code}</p>
        <span className={styles.productBottom}>
          <button onClick={handleDeleteFromStore}>
            <DeleteFromBasket />
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
          <button onClick={handleDecreaseItemQuantity}>-</button>
          <p>{quantity}</p>
          <button onClick={handleIncrementItemQuantity}>+</button>
        </div>
        <p className={styles.productPrice}>
          {convertPriceToReadable(totalPrice, currency, locale)}
        </p>
      </div>
    </Link>
  );
}
