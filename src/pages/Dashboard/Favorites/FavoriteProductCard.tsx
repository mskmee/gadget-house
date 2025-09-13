import { FC, MouseEvent, useEffect, useState } from 'react';
import styles from './UserFavorites.module.scss';
import { IProductCard } from '@/interfaces/interfaces';
import { Rate } from 'antd';
import {
  BasketIcon,
  CloseModal,
  rateEmptyImg,
  rateImg,
} from '@/assets/constants';
import { DeleteFromBasket } from '@/assets/icons/DeleteFromBasket';
import { useActions } from '@/hooks/useActions';
import { Link } from 'react-router-dom';
import { HeartIcon } from '@/assets/icons/HeartIcon';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { convertPriceToReadable } from '@/utils/helpers/product';

interface IFavoriteProductProps {
  favoriteProduct: IProductCard;
}

export const FavoriteProductCard: FC<IFavoriteProductProps> = ({
  favoriteProduct,
}) => {
  const { id, category, href, images, name, code, price, rating, isLiked } =
    favoriteProduct;

  const { locale, currency } = useTypedSelector((state) => state.shopping_card);

  const [isMobile575, setIsMobile575] = useState(false);

  useEffect(() => {
    function responsive() {
      if (window.innerWidth < 575) {
        setIsMobile575(true);
      } else {
        setIsMobile575(false);
      }
    }

    responsive();

    window.addEventListener('resize', responsive);

    return () => {
      window.removeEventListener('resize', responsive);
    };
  }, []);

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

  const handleClickClearBtn = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSaveFavoriteProduct();
  };

  const CardMobile = () => {
    return (
      <Link to={`/${category}/${id}/${href}`} className={styles.cardWrap}>
        <div className={styles.cardMobile__top}>
          <div className={styles.cardMobile__topLeft}>
            <img className={styles.cardImage} src={images[0].link} alt={name} />
            <div className={styles.cardMobile__info}>
              <div className={styles.cardMobile__title}>{name}</div>
              <div className={styles.cardMobile__rating}>
                <Rate
                  className="reviews_rate-stars"
                  character={({ index = 0 }) => (
                    <img
                      src={index < productRating ? rateImg : rateEmptyImg}
                      alt="product rate star"
                      width={12}
                      height={12}
                    />
                  )}
                />
              </div>
              <div className={styles.cardMobile__code}>code: {code}</div>
            </div>
          </div>
          <div className={styles.cardMobile__topRight}>
            <button
              className={styles.basketPopupRemoveProduct}
              onClick={handleClickClearBtn}
            >
              <CloseModal size="28" />
            </button>
            <div className={styles.mobilePrice}>
              {convertPriceToReadable(price, currency, locale)}
            </div>
          </div>
        </div>
        <div className={styles.cardMobile__bottom}>
          <div className={styles.cardInfoAddFavorite}>
            <HeartIcon
              onClick={handleSaveFavoriteProduct}
              isLiked={isLiked}
              type="basket"
            />
          </div>

          <button
            onClick={handleAddToBasket}
            tabIndex={-1}
            className={styles.addToBasker}
          >
            <BasketIcon color="#fff" size={{ width: '34', height: '34' }} />
          </button>
        </div>
      </Link>
    );
  };

  return !isMobile575 ? (
    <Link to={`/${category}/${id}/${href}`} className={styles.cardWrap}>
      <img className={styles.cardImage} src={images[0].link} alt={name} />
      <div className={styles.cardInfo}>
        <div className={styles.cardInfoTop}>
          <div>
            <h3>{name}</h3>
            <button
              className={styles.basketPopupRemoveProduct}
              onClick={handleClickClearBtn}
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
            <span>{convertPriceToReadable(price, currency, locale)}</span>
            <button onClick={handleAddToBasket} tabIndex={-1}>
              <BasketIcon color="#fff" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  ) : (
    <CardMobile />
  );
};
