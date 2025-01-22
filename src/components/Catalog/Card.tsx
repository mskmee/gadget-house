import { FC, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { Rate } from 'antd';

import { useProductCardHandlers } from '@/hooks/hooks';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { convertPriceToReadable } from '@/utils/helpers/product';
import { ProductItem } from '@/utils/packages/products';
import { rateImg, rateEmptyImg } from '@/assets/constants';

import { HeartIcon } from '@/assets/icons/HeartIcon';
import { BasketIcon } from '@/assets/icons/BasketIcon';

import styles from '../Card/card.module.scss';

interface ISmartphoneCardProps {
  product: ProductItem;
  classname: string;
  index?: number;
}

export const Card: FC<ISmartphoneCardProps> = ({
  product,
  classname,
  index,
}) => {
  const { isLiked, handleClickLike } = useProductCardHandlers();
  const { addToStore } = useActions();
  const { locale, currency } = useTypedSelector((state) => state.shopping_card);

  const productRating = product.rating ?? 0;

  const addToBasket = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToStore({
      ...product,
      title: product.name,
      images: [product.images[0].link],
      isLiked: false,
      rate: product.rating,
      anotherColors: [],
      code: 'product_code',
      price: product.price.toString(),
      category: product.category,
    });
    toast.success('The product has been successfully added to your cart!', {
      position: 'top-center',
      type: 'success',
      autoClose: 4000,
      theme: 'dark',
    });
  };

  return (
    <>
      <Link
        className={`${styles.cardConatiner} ${classname} `}
        key={product.id}
        to={`/${classname}/${product.id}/${product.name}`}
        tabIndex={0}
      >
        <div className={classNames(styles.cardContainerTop)}>
          <div
            className={
              classname === 'previously-reviewed' && index !== 2 && index !== 6
                ? styles.laptopCardImage
                : classname === 'laptop'
                  ? styles.laptopCardImage
                  : styles.cardImage
            }
          >
            {product.images.length > 0 &&
              product.images.map((image) => (
                <img src={image.link} key={image.link} alt="Product image" />
              ))}
          </div>

          <div className={`${styles.cardConatinerLike}`}>
            <HeartIcon onClick={handleClickLike} isLiked={isLiked} />
          </div>
          <div></div>
        </div>
        <div className={styles.cardContainerBottom}>
          <h3>{product.name}</h3>
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
              <span>{product.id}</span>
            </div>
          </div>
          <div className={styles.cardPriceContainer}>
            <p>{convertPriceToReadable(product.price, currency, locale)}</p>
            <button onClick={addToBasket}>
              <BasketIcon />
            </button>
          </div>
        </div>
      </Link>
    </>
  );
};
