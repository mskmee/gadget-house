import styles from './basketpopup.module.scss';
import { convertPriceToReadable } from '@/utils/helpers/product.ts';
import { useTypedSelector } from '@/hooks/useTypedSelector.ts';
import { useActions } from '@/hooks/useActions.ts';
import {
  inBasket,
  closeBasketPopupIcon,
  deleteFromBasketPopupIcon,
} from '@/assets/constants.ts';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '@/enums/Route.ts';
import { Carousels, SliderNav } from '@/components/components.ts';

export default function BasketPopup() {
  const navigate = useNavigate();

  const { products, currency, locale, selectedProductId } = useTypedSelector(
    (state) => state.shopping_card,
  );

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

  const { id, title, code, img, quantity, totalPrice } = selectedProduct;

  return (
    <div className={styles.basketPopup}>
      <button
        className={styles.basketPopupClose}
        onClick={() => closeBasketPopup()}
      >
        <img src={closeBasketPopupIcon} alt="close" />
      </button>
      <div className={styles.basketPopupProduct}>
        <div className={styles.basketPopupImg}>
          <img src={img} alt={title} />
          <img
            className={styles.basketPopupAdded}
            src={inBasket}
            alt="product in basket"
          />
        </div>
        <div className={styles.basketPopupInfo}>
          <p className={styles.basketPopupProductTitle}>{title}</p>
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
          <img src={deleteFromBasketPopupIcon} alt="close" />
        </button>
      </div>
      <SliderNav
        text="Previously reviewed offers"
        link="/smartphones"
        isVisibleSeeMoreBtn={false}
      />
      <Carousels classname="basket-popup-carousel" />
    </div>
  );
}
