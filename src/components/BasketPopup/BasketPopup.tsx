import styles from './basketpopup.module.scss';
import { convertPriceToReadable } from '@/utils/helpers/product.ts';
import { useTypedSelector } from '@/hooks/useTypedSelector.ts';
import { useActions } from '@/hooks/useActions.ts';
import {
  inBasket,
  closeBasketPopupIcon,
  quantityDecreaseButton,
  quantityInreaseButton,
} from '@/assets/constants.ts';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '@/enums/Route.ts';
import { DeleteFromBasket } from '@/assets/icons/DeleteFromBasket';
import { useMediaQuery } from 'react-responsive';
import { HeartIcon } from '@/assets/icons/HeartIcon';
import { useProductCardHandlers } from '@/hooks/useProductCardHandlers';

export default function BasketPopup() {
  const navigate = useNavigate();

  const isLessThan768px = useMediaQuery({
    query: '(max-width: 768px)',
  });

  const { products, currency, locale, selectedProductId } = useTypedSelector(
    (state) => state.shopping_card,
  );
  const { isLiked, handleClickLike } = useProductCardHandlers();

  const {
    deleteFromStore,
    closeBasketPopup,
    increaseItemQuantity,
    decreaseItemQuantity,
  } = useActions();
  const selectedProduct = products.find(
    (product) => product.id === selectedProductId,
  );

  if (!selectedProduct) return null;

  const { id, name, code, images, quantity, totalPrice } = selectedProduct;

  return isLessThan768px ? (
    <div className={styles.mobilePopup}>
      <div className={styles.top}>
        <img src={images?.[0].link} alt={name} />
        <div>
          <h2 className={styles.mobilePopupTitle}>{name}</h2>
          <p className={styles.mobilePopupCode}>code:{code}</p>
        </div>
        <div>
          <button
            className={styles.mobilePopupClose}
            onClick={() => closeBasketPopup()}
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
          <button
            onClick={() => {
              if (quantity > 1) {
                decreaseItemQuantity(id);
              } else {
                closeBasketPopup();
                decreaseItemQuantity(id);
              }
            }}
          >
            <img src={quantityDecreaseButton} alt="quantity-Decrease-Button" />
          </button>
          <p>{quantity}</p>
          <button onClick={() => increaseItemQuantity(id)}>
            <img src={quantityInreaseButton} alt="quantity-Inrease-Button" />
          </button>
        </div>
        <button>
          <HeartIcon onClick={handleClickLike} isLiked={isLiked} />
        </button>
      </div>
    </div>
  ) : (
    <div className={styles.basketPopup}>
      <button
        className={styles.basketPopupClose}
        onClick={() => closeBasketPopup()}
      >
        <img src={closeBasketPopupIcon} alt="close" />
      </button>
      <div className={styles.basketPopupProduct}>
        <div className={styles.basketPopupImg}>
          <img src={images?.[0].link} alt={name} />
          <img
            className={styles.basketPopupAdded}
            src={inBasket}
            alt="product in basket"
          />
        </div>
        <div className={styles.basketPopupInfo}>
          <h2 className={styles.basketPopupProductTitle}>{name}</h2>
          <p className={styles.basketPopupProductCode}>code:{code}</p>
          <div className={styles.basketPopupProductTotals}>
            <div className={styles.basketPopupProductQuantity}>
              <button
                onClick={() => {
                  if (quantity > 1) {
                    decreaseItemQuantity(id);
                  } else {
                    closeBasketPopup();
                    decreaseItemQuantity(id);
                  }
                }}
              >
                -
              </button>
              <p>{quantity}</p>
              <button onClick={() => increaseItemQuantity(id)}>+</button>
            </div>
          </div>
          <div className={styles.basketPopupBottom}>
            <h3 className={styles.basketPopupProductPrice}>
              {convertPriceToReadable(totalPrice, currency, locale)}
            </h3>
            <button
              className={styles.basketPopupContinueShopping}
              onClick={() => closeBasketPopup()}
            >
              Continue Shopping
            </button>
            <button
              className={styles.basketPopupGotoBasket}
              onClick={() => {
                closeBasketPopup();
                navigate(AppRoute.BASKET_PAGE);
              }}
            >
              Go to basket
            </button>
          </div>
        </div>
        <button
          className={styles.basketPopupRemoveProduct}
          onClick={() => {
            closeBasketPopup();
            deleteFromStore(id);
          }}
        >
          <DeleteFromBasket />
        </button>
      </div>
    </div>
  );
}
