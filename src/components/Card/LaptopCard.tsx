import { laptopData } from './constants';
import styles from './card.module.css';
import { Card, Rate } from 'antd';
import useProductCardHandlers from '@/hooks/useProductCardHandlers';
import { BasketIcon } from '@/assets/icons/BasketIcon';
import { rateEmptyImg, rateImg } from '@/assets/constants';
import { ICard } from '@/interfaces/interfaces';
import { FC } from 'react';

interface ILaptopCardProps {
  product: ICard;
}

export const LaptopCard: FC<ILaptopCardProps> = ({ product }) => {
  const { isLiked, handleClickBuy, handleClickLike } = useProductCardHandlers();

  const productRating = product.rate ?? 0;

  return (
    <div>
      {laptopData.map((item) => (
        <Card className={styles.cardConatiner} key={item.id}>
          <div className={styles.cardContainerTop}>
            <img
              src={item.img}
              className={styles.productImage}
              alt="Product image"
            />
            <div
              className={`${styles.cardConatinerLike} ${styles.cardConatinerLikeLaptop}`}
            >
              <img
                onClick={handleClickLike}
                src={isLiked ? item.likeIcon : item.likeIconClick}
                alt="Like"
                className={styles.likeIcon}
              />
              <img
                src={item.colorPalette}
                className={`${styles.colorPalette} ${styles.colorPaletteLaptop}`}
                alt="Palette image"
              />
            </div>
          </div>
          <div className={styles.cardContainerBottom}>
            <h3>{item.title}</h3>
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
              <p>{item.price}</p>
              <BasketIcon handleClickBuy={handleClickBuy} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
