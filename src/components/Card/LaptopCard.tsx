import { FC } from 'react';
import { Rate } from 'antd';
import styles from './card.module.css';
import { rateImg, rateEmptyImg } from '@/assets/constants';
import { Link } from 'react-router-dom';
import useProductCardHandlers from '@/hooks/useProductCardHandlers';
import { IAccessory } from '@/interfaces/interfaces';
import { BasketIcon } from '@/assets/icons/BasketIcon';
import classNames from 'classnames';

interface ILaptopCard {
  product: IAccessory;
  classname: string;
}

export const LaptopCard: FC<ILaptopCard> = ({ product, classname }) => {
  const { isLiked, handleClickBuy, handleClickLike } = useProductCardHandlers();

  const productRating = product.rate ?? 0;
  const encodedTitle = encodeURIComponent(product?.title || '');

  return (
    <>
      <Link
        className={`${styles.cardConatiner} ${classname} `}
        key={product?.id}
        to={`/smartphone/${encodedTitle}`}
        tabIndex={0}
      >
        <div
          className={`${styles.cardContainerTop} ${
            Array.isArray(product?.hasAnotherColor)
              ? styles.alignCenter
              : styles.alignStart
          }`}
        >
          <div className={styles.productImage}>
            <img src={product?.img} alt="Product image" />
          </div>

          <div
            className={`${styles.cardConatinerLike} ${
              !Array.isArray(product?.hasAnotherColor) ? styles.marginTop : ''
            }`}
          >
            <img
              onClick={handleClickLike}
              src={isLiked ? product?.likeIcon : product?.likeIconClick}
              alt="Like"
              className={styles.likeIcon}
            />
            {product?.colorPalette ? (
              <img
                src={product?.colorPalette}
                className={styles.colorPalette}
                alt="Palette image"
              />
            ) : (
              Array.isArray(product?.hasAnotherColor) &&
              product?.hasAnotherColor.length > 0 && (
                <div className={styles['accessories-colors']}>
                  {product?.hasAnotherColor.map((color: string) => (
                    <div
                      key={color}
                      style={{ backgroundColor: color }}
                      className={classNames({
                        [styles['hasBorder']]: color === '#ffffff',
                      })}
                    ></div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
        <div className={styles.cardContainerBottom}>
          <h3>{product?.title}</h3>
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
            <p>{product?.price}</p>
            <BasketIcon handleClickBuy={handleClickBuy} />
          </div>
        </div>
      </Link>
    </>
  );
};

export default LaptopCard;
