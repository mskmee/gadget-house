import { Link } from 'react-router-dom';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useAuthRequired } from '@/hooks/useAuthRequired';
import getFormattedCategoryName from '@/hooks/getFormattedCategoryName';
import {
  BasketMinusBtn,
  BasketPlusBtn,
  closeBasketPopupIcon,
} from '@/assets/constants.ts';
import { HeartIcon } from '@/assets/icons/HeartIcon';
import { convertPriceToReadable } from '@/utils/helpers/product';
import { IBasketChildren } from './type/interfaces';
import styles from './basketitem.module.scss';
import { useActions } from '@/hooks/useActions';

function BasketItemMobile({
  product,
  handleDeleteFromStore,
  handleDecreaseItemQuantity,
  handleIncrementItemQuantity,
  isLikedProduct,
}: IBasketChildren) {
  const { id, name, code, images, quantity, totalPrice, href, categoryId } =
    product;
  const { locale, currency } = useTypedSelector((state) => state.shopping_card);
  const { user } = useTypedSelector((state) => state.auth);
  const formatCategoryName = getFormattedCategoryName(categoryId);
  const { toggleFavorite } = useActions();
  const { triggerAuthRequired } = useAuthRequired();

  const handleSaveFavoriteProduct = () => {
    if (!user) {
      triggerAuthRequired('favorite');
      return;
    }
    toggleFavorite(product);
  };
  return (
    <>
      <div className={styles.mobilePopup}>
        <div className={styles.top}>
          <Link
            to={`/${formatCategoryName}/${id}/${href}`}
            className={styles.productImg}
          >
            <img src={images?.[0].link} alt={name} />
          </Link>
          <div>
            <Link to={`/${formatCategoryName}/${id}/${href}`}>
              <h2 className={styles.mobilePopupTitle}>{name}</h2>
            </Link>
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
              <img src={BasketMinusBtn} alt="quantity-Decrease-Button" />
            </button>
            <p>{quantity}</p>
            <button onClick={handleIncrementItemQuantity}>
              <img src={BasketPlusBtn} alt="quantity-Inrease-Button" />
            </button>
          </div>
          <>
            <HeartIcon
              onClick={handleSaveFavoriteProduct}
              isLiked={isLikedProduct}
              fill={isLikedProduct ? '#6F4C9A' : '#000'}
            />
          </>
        </div>
      </div>
    </>
  );
}

export default BasketItemMobile;
