import { FC, MouseEvent } from 'react';
import { notification, Rate } from 'antd';
import styles from './card.module.scss';
import { rateImg, rateEmptyImg } from '@/assets/constants';
import { Link } from 'react-router-dom';
import {
  IBrandCard,
  IProductCard,
  TProductImageCard,
} from '@/interfaces/interfaces';
import { BasketIcon } from '@/assets/icons/BasketIcon';
import classNames from 'classnames';
import { HeartIcon } from '@/assets/icons/HeartIcon';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { convertPriceToReadable } from '@/utils/helpers/product';
import useLocalStorage from '@/hooks/useLocalStorage';

interface ISmartphoneCardProps {
  tempProduct: IProductCard | TProductImageCard | IBrandCard | undefined;
  classname: string;
  index?: number;
  width: number;
}

const MAX_ITEMS = 8;

export const MyCard: FC<ISmartphoneCardProps> = ({
  tempProduct,
  classname,
  index,
  width,
}) => {
  const { toggleFavorite } = useActions();
  const product = tempProduct as IProductCard;

  const [previouslyReviewed, setPreviouslyReviewed] = useLocalStorage<
    IProductCard[]
  >('previouslyReviewed', []);

  const saveReviewedItem = (newItem: IProductCard) => {
    const updatedItems = [newItem, ...previouslyReviewed];

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
      if (classname === 'basket-popup') {
        notification.open({
          className: 'basket-popup-notification',
          placement: 'top',
          message: 'Product added to the basket',
          duration: 3,
          closeIcon: false,
        });
      }
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
    if (product) {
      toggleFavorite(product);
    }
  };

  const handleSaveReviewedItem = () => {
    if (product) {
      saveReviewedItem(product);
    }
  };

  return (
    <>
      <div className={styles.isolateHoverEffectFromRerender}>
        <Link
          className={`${styles.cardConatiner} ${classname} `}
          key={product?.id}
          to={`${classname}/${product?.id}/${product?.href}`}
          tabIndex={0}
          style={{ minWidth: classname !== 'basket-popup' ? `${width}px` : '' }}
          onClick={handleSaveReviewedItem}
        >
          <div
            className={classNames(styles.cardContainerTop, {
              [styles.alignCenter]: Array.isArray(product?.anotherColors),
              [styles.alignStart]: !Array.isArray(product?.anotherColors),
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
                src={product?.images[0].link}
                alt="Product image"
              />
            </div>

            <div
              className={`${styles.cardConatinerLike} ${
                !Array.isArray(product?.anotherColors) ? styles.marginTop : ''
              }`}
            >
              <HeartIcon
                onClick={handleSaveFavoriteProduct}
                isLiked={isLikedProduct}
              />

              {(product as IProductCard)?.anotherColors?.length > 0 && (
                <div className={styles['accessories-colors']}>
                  {product?.anotherColors.map((color: string) => (
                    <div
                      key={crypto.randomUUID()}
                      style={{ backgroundColor: color }}
                      className={classNames({
                        [styles['hasBorder']]: color === '#ffffff',
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
                character={({ index = 0 }) => {
                  return (
                    <img
                      src={index < productRating ? rateImg : rateEmptyImg}
                      alt="product rate star"
                      width={24}
                      height={24}
                    />
                  );
                }}
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
              <button onClick={handleaddToBasket} tabIndex={-1}>
                <BasketIcon />
              </button>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};
