import styles from './basketpopup.module.scss';
import { convertPriceToReadable } from '@/utils/helpers/product.ts';
import { useTypedSelector } from '@/hooks/useTypedSelector.ts';
import { useActions } from '@/hooks/useActions.ts';
import {
  inBasket,
  closeBasketPopupIcon,
  quantityDecreaseButton,
  quantityInreaseButtonMobile,
  noImageAvailable,
} from '@/assets/constants.ts';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '@/enums/Route.ts';
import { DeleteFromBasket } from '@/assets/icons/DeleteFromBasket';
import { useMediaQuery } from 'react-responsive';
import { Carousels } from '../components';
import { notification } from 'antd';
import { MAX_PRODUCT_QUANTITY } from '@/constants/globalConstans';

export default function BasketPopup() {
  const navigate = useNavigate();

  const isLessThan768px = useMediaQuery({
    query: '(max-width: 768px)',
  });
  ``;
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

  const { id, name, code, images, quantity, totalPrice } = selectedProduct;
  const imageSrc = images?.[0]?.link ?? noImageAvailable;

  const handleDecreaseItemQuantity = () => {
    if (quantity > 1) {
      decreaseItemQuantity(id);
    } else {
      closeBasketPopup();
      decreaseItemQuantity(id);
    }
  };

  const handleIncreaseItemQuantity = () => {
    if (quantity !== MAX_PRODUCT_QUANTITY) {
      increaseItemQuantity(id);
    }
    if (quantity == MAX_PRODUCT_QUANTITY) {
      notification.open({
        className: 'basket-popup-notification',
        placement: 'top',
        message: 'You can add up to 20 products',
        duration: 3,
        closeIcon: false,
      });
    }
  };

  const handleClosePopup = () => {
    closeBasketPopup();
  };

  const handleGotoBasket = () => {
    closeBasketPopup();
    navigate(AppRoute.BASKET_PAGE);
  };

  const handleRemoveProduct = () => {
    closeBasketPopup();
    deleteFromStore(id);
  };

  return (
    <div className={styles.basketPopup}>
      <button className={styles.basketPopupClose} onClick={handleClosePopup}>
        <img src={closeBasketPopupIcon} alt="close" />
      </button>
      {isLessThan768px ? (
        <>
          <div className={styles.basketPopupContent}>
            <h2 className={styles.basketPopupTitle}>
              Has been added to the basket
            </h2>
            <div className={styles.basketPopupTop}>
              <div className={styles.basketPopupImg}>
                <img src={imageSrc} alt={name || 'Product image'} />
                <img
                  className={styles.basketPopupAdded}
                  src={inBasket}
                  alt="product in basket"
                />
              </div>
              <h3 className={styles.basketPopupProductTitle}>{name}</h3>
              <button
                className={styles.basketPopupRemoveProduct}
                onClick={handleRemoveProduct}
              >
                <DeleteFromBasket />
              </button>
            </div>

            <div className={styles.basketPopupMiddle}>
              <div className={styles.basketPopupProductQuantity}>
                <button onClick={handleDecreaseItemQuantity}>
                  <img src={quantityDecreaseButton} alt="decrease button" />
                </button>
                <p>{quantity}</p>
                <button onClick={handleIncreaseItemQuantity}>
                  <img
                    src={quantityInreaseButtonMobile}
                    alt="increase button"
                  />
                </button>
              </div>
              <span className={styles.basketPopupProductPrice}>
                {convertPriceToReadable(totalPrice, currency, locale)}
              </span>
            </div>

            <div className={styles.basketPopupBottom}>
              <button
                className={styles.basketPopupGotoBasket}
                onClick={handleGotoBasket}
              >
                Go to basket
              </button>
            </div>
          </div>
          <div className={styles.basketPopupCarousel}>
            <h2>You may also like</h2>
            <Carousels classname="basket-popup-carousel" />
          </div>
        </>
      ) : (
        <div className={styles.basketPopupProduct}>
          <div className={styles.basketPopupImg}>
            <img src={imageSrc} alt={name || 'Product image'} />
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
                <button onClick={handleDecreaseItemQuantity}>
                  <span>-</span>
                </button>
                <p>{quantity}</p>
                <button onClick={handleIncreaseItemQuantity}>
                  <span>+</span>
                </button>
              </div>
            </div>
            <div className={styles.basketPopupBottom}>
              <h3 className={styles.basketPopupProductPrice}>
                {convertPriceToReadable(totalPrice, currency, locale)}
              </h3>
              <div>
                <button
                  className={styles.basketPopupContinueShopping}
                  onClick={handleClosePopup}
                >
                  Continue Shopping
                </button>
                <button
                  className={styles.basketPopupGotoBasket}
                  onClick={handleGotoBasket}
                >
                  Go to basket
                </button>
              </div>
            </div>
          </div>
          <button
            className={styles.basketPopupRemoveProduct}
            onClick={handleRemoveProduct}
          >
            <DeleteFromBasket />
          </button>
        </div>
      )}
    </div>
  );
}
