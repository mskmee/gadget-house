import { FC, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { notification, Rate } from 'antd';
import { HeartIcon } from '@/assets/icons/HeartIcon';
import { BasketIcon } from '@/assets/icons/BasketIcon';
import { useActions } from '@/hooks/useActions';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useAuthRequired } from '@/hooks/useAuthRequired';
import getFormattedCategoryName from '@/hooks/getFormattedCategoryName';
import { convertPriceToReadable } from '@/utils/helpers/product';
import { rateImg, rateEmptyImg } from '@/assets/constants';
import styles from './card.module.scss';
import {
  IBrandCard,
  IProductCard,
  TProductImageCard,
} from '@/interfaces/interfaces';
interface ISmartphoneCardProps {
  tempProduct: IProductCard | TProductImageCard | IBrandCard | undefined;
  classname: string;
  index?: number;
  width?: number;
}

const MAX_ITEMS = 8;

export const MyCard: FC<ISmartphoneCardProps> = ({
  tempProduct,
  classname,
  index,
  width,
}) => {
  const { toggleFavorite } = useActions();
  const { user } = useTypedSelector((state) => state.auth);
  const { triggerAuthRequired } = useAuthRequired();
  const product = tempProduct as IProductCard;

  const [previouslyReviewed, setPreviouslyReviewed] = useLocalStorage<
    IProductCard[]
  >('previouslyReviewed', []);

  const saveReviewedItem = (newItem: IProductCard) => {
    const filteredItems = previouslyReviewed.filter(
      (item) => item.id !== newItem.id,
    );
    const updatedItems = [newItem, ...filteredItems];

    const limitedItems = updatedItems.slice(0, MAX_ITEMS);
    setPreviouslyReviewed(limitedItems);
  };

  const { addToStore } = useActions();
  const { products, locale, currency } = useTypedSelector(
    (state) => state.shopping_card,
  );
  const productRating = product?.rating ?? 0;
  const selectedProduct = products.find((item) => item.id === product?.id);
  const isLikedProduct = useTypedSelector((state) =>
    state.products.favoriteProducts.some((fav) => fav.id === product?.id),
  );

  const handleaddToBasket = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      (selectedProduct && selectedProduct?.quantity < 20) ||
      selectedProduct === undefined
    ) {
      addToStore(product as IProductCard);
      notification.open({
        className: 'basket-popup-notification',
        placement: 'bottom',
        message: 'Product added to the basket',
        duration: 3,
        closeIcon: false,
      });
    }
    if (selectedProduct?.quantity == 20) {
      notification.open({
        className: 'basket-popup-notification',
        placement: 'top',
        message: 'You can add up to 20 products',
        duration: 3,
        closeIcon: false,
      });
    }
  };

  const handleSaveFavoriteProduct = () => {
    if (!user) {
      triggerAuthRequired('favorite');
      return;
    }
    toggleFavorite(product);
  };

  const handleSaveReviewedItem = () => {
    if (product) {
      saveReviewedItem(product);
    }
  };
  const anotherColors = (product as IProductCard)?.alternativeProducts?.color;
  const formatCategoryName = getFormattedCategoryName(product?.categoryId);

  return (
    <>
      <div className={styles.isolateHoverEffectFromRerender}>
        <Link
          className={`${styles.cardConatiner} ${classname} `}
          key={product?.id}
          to={`/${formatCategoryName}/${product?.id}/${product?.href}`}
          tabIndex={0}
          style={{ minWidth: classname !== 'basket-popup' ? `${width}px` : '' }}
          onClick={handleSaveReviewedItem}
        >
          <div
            className={classNames(styles.cardContainerTop, {
              [styles.alignCenter]: Array.isArray(anotherColors),
              [styles.alignStart]: !Array.isArray(anotherColors),
            })}
          >
            <div
              className={
                classname === 'previously-reviewed' &&
                index !== 2 &&
                index !== 6
                  ? styles.cardImage
                  : classname === 'laptop'
                    ? styles.laptopCardImage
                    : styles.cardImage
              }
            >
              <img
                className={
                  classname === 'smartphones'
                    ? styles.smartphoneImg
                    : styles.laptopImg
                }
                src={product?.images[0]?.link}
                alt="Product image"
              />
            </div>

            <div
              className={`${styles.cardConatinerLike} ${
                !Array.isArray(anotherColors) ? styles.marginTop : ''
              }`}
            >
              <HeartIcon
                onClick={handleSaveFavoriteProduct}
                isLiked={isLikedProduct}
              />

              {anotherColors && anotherColors?.length > 0 && (
                <div className={styles['accessories-colors']}>
                  {anotherColors?.map((color) => (
                    <div
                      key={color.attributeValue}
                      style={{ backgroundColor: color.attributeValue }}
                      className={classNames({
                        [styles['hasBorder']]:
                          color.attributeValue === '#ffffff',
                      })}
                    ></div>
                  ))}
                </div>
              )}
            </div>
            <div></div>
          </div>
          <div className={styles.cardContainerBottom}>
            <h3>{product?.name}</h3>
            <div className={styles.cardRate}>
              <Rate
                className="reviews_rate-stars"
                disabled
                // style={{ pointerEvents: 'none' }}
                character={({ index = 0 }) => (
                  <img
                    src={index < productRating ? rateImg : rateEmptyImg}
                    alt="product rate star"
                    width={24}
                    height={24}
                  />
                )}
              />
              <div className={styles['card-code']}>
                <span>code:</span>
                <span>{product?.code}</span>
              </div>
            </div>
            <div className={styles.cardPriceContainer}>
              <p>
                {convertPriceToReadable(
                  (product as IProductCard)?.price,
                  currency,
                  locale,
                )}
              </p>
              <button onClick={handleaddToBasket} tabIndex={0}>
                <BasketIcon />
              </button>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};
