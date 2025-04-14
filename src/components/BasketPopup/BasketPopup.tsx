import styles from './basketpopup.module.scss';
import { convertPriceToReadable } from '@/utils/helpers/product.ts';
import { useTypedSelector } from '@/hooks/useTypedSelector.ts';
import { useActions } from '@/hooks/useActions.ts';
import { inBasket, closeBasketPopupIcon } from '@/assets/constants.ts';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '@/enums/Route.ts';
import { DeleteFromBasket } from '@/assets/icons/DeleteFromBasket';

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

  const { id, name, code, images, quantity, totalPrice } = selectedProduct;

  const handleDecreaseItemQuantity = () => {
    if (quantity > 1) {
      decreaseItemQuantity(id);
    } else {
      closeBasketPopup();
      decreaseItemQuantity(id);
    }
  };

  const handleIncreaseItemQuantity = () => {
    increaseItemQuantity(id);
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
      <div className={styles.basketPopupProduct}>
        <div className={styles.basketPopupImg}>
          <img src={images?.[0]?.link} alt={name} />
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
        <button
          className={styles.basketPopupRemoveProduct}
          onClick={handleRemoveProduct}
        >
          <DeleteFromBasket />
        </button>
      </div>
    </div>
  );
}
