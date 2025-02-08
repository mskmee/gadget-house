import { FC } from 'react';

import { IShoppingCard } from '@/interfaces/interfaces';
import { convertPriceToReadable } from '@/utils/helpers/product';
import { useProductCardHandlers } from '@/hooks/useProductCardHandlers';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { HeartIcon } from '@/assets/icons/HeartIcon';

import styles from '../../../order-confirmation.module.scss';

interface IProductCardProps {
  product: IShoppingCard;
}

export const ProductCardForOrder: FC<IProductCardProps> = ({ product }) => {
  const { isLiked, handleClickLike } = useProductCardHandlers();
  const { deleteFromStore, increaseItemQuantity, decreaseItemQuantity } =
    useActions();

  const { currency, locale } = useTypedSelector((state) => state.shopping_card);

  return (
    <li className={styles.order__item}>
      <article className={styles.order__itemWrapper}>
        <div className={styles.order__itemImage}>
          <img
            src={product.images[0].link}
            alt={product.name}
            width={100}
            height={100}
          />
        </div>

        <div className={styles.order__itemInfo}>
          <div className={styles.order__itemHeader}>
            <h4 className={styles.order__itemTitle}>{product.name}</h4>

            <button
              className={styles.order__itemDelete}
              type="button"
              onClick={() => deleteFromStore(product.id)}
            ></button>
          </div>

          <p className={styles.order__itemCode}>code: {product.code}</p>

          <div className={styles.order__itemFooter}>
            <div className={styles.order__itemQuantity}>
              <button onClick={() => decreaseItemQuantity(product.id)}>
                -
              </button>
              <p>{product.quantity}</p>
              <button onClick={() => increaseItemQuantity(product.id)}>
                +
              </button>
            </div>

            <p className={styles.order__itemPrice}>
              {convertPriceToReadable(product.totalPrice, currency, locale)}
            </p>
          </div>
        </div>
      </article>

      <article className={styles.order__itemWrapper_mobile}>
        <div className={styles.order__itemInfo}>
          <div className={styles.order__itemImage}>
            <img
              src={product.images[0].link}
              alt={product.name}
              width={100}
              height={100}
            />
          </div>

          <div className={styles.order__itemContent}>
            <div className={styles.order__itemHeader}>
              <h4 className={styles.order__itemTitle}>{product.name}</h4>

              <button
                className={styles.order__itemDelete}
                type="button"
                onClick={() => deleteFromStore(product.id)}
              ></button>
            </div>

            <div className={styles.order__itemFooter}>
              <p className={styles.order__itemCode}>code: {product.code}</p>

              <p className={styles.order__itemPrice}>
                {convertPriceToReadable(product.totalPrice, currency, locale)}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.order__itemButtons}>
          <div className={styles.order__itemQuantity}>
            <div className={styles.order__itemQuantityBtn}>
              <button onClick={() => decreaseItemQuantity(product.id)}>
                -
              </button>
            </div>
            <p>{product.quantity}</p>
            <div className={styles.order__itemQuantityBtn}>
              <button onClick={() => increaseItemQuantity(product.id)}>
                +
              </button>
            </div>
          </div>

          <div className={styles.order__itemQuantityBtnFavorite}>
            <HeartIcon onClick={handleClickLike} isLiked={isLiked} />
          </div>
        </div>
      </article>
    </li>
  );
};
