import { FC, MouseEvent } from 'react';
import styles from './UserFavorites.module.scss';
import { IProductCard } from '@/interfaces/interfaces';
import { Rate } from 'antd';
import { BasketIcon, rateEmptyImg, rateImg } from '@/assets/constants';
import { DeleteFromBasket } from '@/assets/icons/DeleteFromBasket';
import { useActions } from '@/hooks/useActions';
import { Link } from 'react-router-dom';
import { HeartIcon } from '@/assets/icons/HeartIcon';

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
      <img className={styles.cardImage} src={images[0].link} alt={name} />
      <div className={styles.cardInfo}>
        <div className={styles.cardInfoTop}>
          <div>
            <h3>{name}</h3>
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
              type="basket"
            />
          </div>
          <div className={styles.cardInfoPrice}>
            <span>{price} ₴</span>
            <button onClick={handleAddToBasket} tabIndex={-1}>
              <BasketIcon />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
