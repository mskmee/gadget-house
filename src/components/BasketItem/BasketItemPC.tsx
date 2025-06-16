import { Link } from "react-router-dom";
import styles from './basketitem.module.scss';
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { deleteFromBasketMob } from '@/assets/constants.ts';
import { DeleteFromBasket } from "@/assets/icons/DeleteFromBasket";
import { HeartIcon } from "@/assets/icons/HeartIcon";
import { convertPriceToReadable } from '@/utils/helpers/product';
import { IBasketChildren } from "./type/interfaces";
import getFormattedCategoryName from "@/hooks/getFormattedCategoryName";

function BasketItemPC({product, handleDeleteFromStore, handleDecreaseItemQuantity, handleIncrementItemQuantity, handleSaveFavoriteProduct, isLikedProduct}: IBasketChildren) {
  const { id, name, code, images, totalPrice, href, categoryId } = product;
  const { locale, currency } = useTypedSelector((state) => state.shopping_card);
  const formatCategoryName = getFormattedCategoryName(categoryId)
  
  return (
    <>
      <div className={styles.basketItem}>
        <Link to={`/${formatCategoryName}/${id}/${href}`}  className={styles.productImg}>
          <img src={images?.[0].link} alt={name} />
        </Link>
        <div className={styles.productInfo}>
          <Link to={`/${formatCategoryName}/${id}/${href}`}>
            <h2 className={styles.productTitle}>{name}</h2>
          </Link>

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
              onClick={handleSaveFavoriteProduct}
              isLiked={isLikedProduct}
              type="basket"
            />
          </span>
        </div>
        <div className={styles.productTotals}>
          <div className={styles.productQuantity}>
            <div className={styles.productQuantityButton}>
              <button
                className={styles.productQuantityButton_minus}
                onClick={handleDecreaseItemQuantity}
              >
              </button>
            </div>

            <p>{product.quantity}</p>

            <div className={styles.productQuantityButton}>
              <button
                className={styles.productQuantityButton_plus}
                onClick={handleIncrementItemQuantity}
              ></button>
            </div>
          </div>
          <p className={styles.productPrice}>
            {convertPriceToReadable(totalPrice, currency, locale)}
          </p>
        </div>
      </div> 
    </>
  );
}

export default BasketItemPC;