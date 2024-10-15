import { FC } from 'react';
import { Rate } from 'antd';
import styles from './card.module.scss';
import { rateImg, rateEmptyImg } from '@/assets/constants';
import { Link } from 'react-router-dom';
import { useProductCardHandlers } from '@/hooks/hooks';
import { IAccessory } from '@/interfaces/interfaces';
import { BasketIcon } from '@/assets/icons/BasketIcon';
import classNames from 'classnames';
import { HeartIcon } from '@/assets/icons/HeartIcon';

interface ISmartphoneCard {
  product: IAccessory;
  classname: string;
  index?: number;
}

export const MyCard: FC<ISmartphoneCard> = ({ product, classname, index }) => {
  const { isLiked, handleClickBuy, handleClickLike } = useProductCardHandlers();

  const productRating = product.rate ?? 0;
  const encodedTitle = encodeURIComponent(product.title || '');

  return (
    <>
      <Link
        className={`${styles.cardConatiner} ${classname} `}
        key={product.id}
        to={`/${classname}/${encodedTitle}`}
        tabIndex={0}
      >
        <div
          className={classNames(styles.cardContainerTop, {
            [styles.alignCenter]: Array.isArray(product.anotherColors),
            [styles.alignStart]: !Array.isArray(product.anotherColors),
          })}
        >
          <div
            className={
              classname === 'previously-reviewed' && index !== 2 && index !== 6
                ? styles.laptopCardImage
                : classname === 'laptop'
                  ? styles.laptopCardImage
                  : styles.cardImage
            }
          >
            <img src={product.img} alt="Product image" />
          </div>

          <div
            className={`${styles.cardConatinerLike} ${
              !Array.isArray(product.anotherColors) ? styles.marginTop : ''
            }`}
          >
            <HeartIcon onClick={handleClickLike} isLiked={isLiked} />

            {product.anotherColors.length > 0 && (
              <div className={styles['accessories-colors']}>
                {product.anotherColors.map((color: string) => (
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
          <h3>{product.title}</h3>
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
              <span>{product.code}</span>
            </div>
          </div>
          <div className={styles.cardPriceContainer}>
            <p>{product.price}</p>
            <BasketIcon handleClickBuy={handleClickBuy} />
          </div>
        </div>
      </Link>
    </>
  );
};
