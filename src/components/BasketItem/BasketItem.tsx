import styles from './basketitem.module.scss';
import { IShoppingCard } from '@/interfaces/interfaces.ts';
import { deleteFromBasketMob } from '@/assets/constants.ts';
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
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M32.334 18H15.666C14.7459 18 14 18.7459 14 19.666V33C14 35.7614 16.2386 38 19 38H29C30.326 38 31.5978 37.4732 32.5356 36.5356C33.4732 35.5978 34 34.326 34 33V19.666C34 18.7459 33.2542 18 32.334 18Z"
                stroke="#1C1817"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M30 14L28.552 11.106C28.2134 10.4285 27.5214 10.0004 26.764 10H21.236C20.4786 10.0004 19.7865 10.4285 19.448 11.106L18 14H30Z"
                stroke="#1C1817"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22.166 24.666C22.166 23.8376 21.4944 23.166 20.666 23.166C19.8376 23.166 19.166 23.8376 19.166 24.666H22.166ZM19.166 31.332C19.166 32.1604 19.8376 32.832 20.666 32.832C21.4944 32.832 22.166 32.1604 22.166 31.332H19.166ZM28.834 24.666C28.834 23.8376 28.1624 23.166 27.334 23.166C26.5056 23.166 25.834 23.8376 25.834 24.666H28.834ZM25.834 31.332C25.834 32.1604 26.5056 32.832 27.334 32.832C28.1624 32.832 28.834 32.1604 28.834 31.332H25.834ZM30 12.5C29.1716 12.5 28.5 13.1716 28.5 14C28.5 14.8284 29.1716 15.5 30 15.5V12.5ZM34 15.5C34.8284 15.5 35.5 14.8284 35.5 14C35.5 13.1716 34.8284 12.5 34 12.5V15.5ZM18 15.5C18.8284 15.5 19.5 14.8284 19.5 14C19.5 13.1716 18.8284 12.5 18 12.5V15.5ZM14 12.5C13.1716 12.5 12.5 13.1716 12.5 14C12.5 14.8284 13.1716 15.5 14 15.5V12.5ZM19.166 24.666V31.332H22.166V24.666H19.166ZM25.834 24.666V31.332H28.834V24.666H25.834ZM30 15.5H34V12.5H30V15.5ZM18 12.5H14V15.5H18V12.5Z"
                fill="#1C1817"
              />
            </svg>
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
