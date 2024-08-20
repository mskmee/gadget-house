import { FC } from 'react';
import { Rate } from 'antd';
import styles from './card.module.css';
import { rateImg, rateEmptyImg } from '../../assets/constants';
import { Link } from 'react-router-dom';
import useProductCardHandlers from '../../hooks/useProductCardHandlers';
import { IAccessory } from '@/interfaces/interfaces';

interface ISmartphoneCard {
  product: IAccessory;
  classname: string;
}

const SmartphoneCard: FC<ISmartphoneCard> = ({ product, classname }) => {
  const {
    isHovered,
    isLiked,
    isMouseDown,
    handleClickBuy,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleMouseEnter,
    handleClickLike,
  } = useProductCardHandlers();

  const accessoryProduct = product as IAccessory;
  const productRating = accessoryProduct.rate ?? 0;

  return (
    <>
      <Link
        className={`${styles.cardConatiner} ${classname} `}
        key={accessoryProduct?.id}
        to="/smartphone/apple iPhone 15 Pro 256Gb Blue Titanium"
      >
        <div
          className={styles.cardContainerTop}
          style={
            Array.isArray(accessoryProduct?.hasAnotherColor)
              ? { alignItems: 'center' }
              : { alignItems: 'start' }
          }
        >
          <img
            src={accessoryProduct?.img}
            className={styles.productImage}
            alt="Product image"
          />
          <div
            className={styles.cardConatinerLike}
            style={
              !Array.isArray(accessoryProduct?.hasAnotherColor)
                ? { marginTop: '20px' }
                : {}
            }
          >
            <img
              onClick={handleClickLike}
              src={
                isLiked
                  ? accessoryProduct?.likeIcon
                  : accessoryProduct?.likeIconClick
              }
              alt="Like"
              className={styles.likeIcon}
            />
            {accessoryProduct?.colorPalette ? (
              <img
                src={accessoryProduct?.colorPalette}
                className={styles.colorPalette}
                alt="Palette image"
              />
            ) : Array.isArray(accessoryProduct?.hasAnotherColor) ? (
              <div className={styles['accessories-colors']}>
                {accessoryProduct?.hasAnotherColor?.map((color: string) => (
                  <div
                    key={color}
                    style={{
                      backgroundColor: color,
                    }}
                  ></div>
                ))}
              </div>
            ) : (
              <span></span>
            )}
          </div>
        </div>
        <div className={styles.cardContainerBottom}>
          <h3>{accessoryProduct?.title}</h3>
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
              <span>{accessoryProduct?.code}</span>
            </div>
          </div>
          <div className={styles.cardPriceContainer}>
            <p>{accessoryProduct?.price}</p>
            <img
              onClick={handleClickBuy}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              src={
                isMouseDown
                  ? accessoryProduct?.basketIconClick
                  : isHovered
                    ? accessoryProduct?.basketIconHover
                    : accessoryProduct?.basketIcon
              }
            />
          </div>
        </div>
      </Link>
    </>
  );
};

export default SmartphoneCard;
