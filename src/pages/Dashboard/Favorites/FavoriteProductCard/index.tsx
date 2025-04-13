import { FC, MouseEvent } from 'react';
import styles from './styles.module.scss';
import { IProductCard } from '@/interfaces/interfaces';
import { Rate } from 'antd';
import { BasketIcon, rateEmptyImg, rateImg } from '@/assets/constants';
import { DeleteFromBasket } from '@/assets/icons/DeleteFromBasket';
import { useActions } from '@/hooks/useActions';
import { Link } from 'react-router-dom';
import { HeartIcon } from '@/assets/icons/HeartIcon';
import { useMediaQuery } from 'react-responsive';

interface IFavoriteProductProps {
  favoriteProduct: IProductCard;
  favoriteProducts: IProductCard[];
}

export const FavoriteProductCard: FC<IFavoriteProductProps> = ({
  favoriteProduct,
}) => {
  const { id, category, href, images, name, code, price, rating, isLiked } =
    favoriteProduct;
  const { addToStore, toggleFavorite } = useActions();

  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  });

  const productRating = rating ?? 0;

  const handleSaveFavoriteProduct = () => {
    if (favoriteProduct) {
      toggleFavorite(favoriteProduct);
    }
  };
  const handleAddToBasket = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToStore(favoriteProduct);
  };

  return (
    <Link to={`/${category}/${id}/${href}`} className={styles.cardWrap}>
      {!isMobile && (
        <img className={styles.cardImage} src={images[0].link} alt={name} />
      )}
      <div className={styles.cardInfo}>
        <div className={styles.cardInfoTop}>
          <div>
            {isMobile && (
              <img
                className={styles.cardImage}
                src={images[0].link}
                alt={name}
              />
            )}
            <h3 className={styles.cardInfoName}>{name}</h3>
            <button
              className={styles.basketPopupRemoveProduct}
              onClick={(e) => {
                e.preventDefault();
                handleSaveFavoriteProduct;
              }}
            >
              <DeleteFromBasket />
            </button>
          </div>
          <span>code: {code}</span>
          <Rate
            className="reviews_rate-stars"
            character={({ index = 0 }) => (
              <img
                src={index < productRating ? rateImg : rateEmptyImg}
                alt="product rate star"
                width={24}
                height={24}
              />
            )}
          />
        </div>
        <div className={styles.cardInfoBottom}>
          <div className={styles.cardInfoAddFavorite}>
            <HeartIcon
              onClick={handleSaveFavoriteProduct}
              isLiked={isLiked}
              type={!isMobile ? 'basket' : undefined}
            />
          </div>
          <div className={styles.cardInfoPrice}>
            {!isMobile && <span>{price} ₴</span>}
            <button onClick={handleAddToBasket} tabIndex={-1}>
              <BasketIcon />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
