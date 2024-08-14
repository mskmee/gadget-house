import { Rate } from 'antd';
import styles from './card.module.css';
import { data } from './constants';
import useProductCardHandlers from '../../hooks/useProductCardHandlers';

const ProductCard = () => {
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

  return (
    <>
      {data.map((item) => (
        <div className={styles.cardConatiner} key={item.id}>
          <div className={styles.cardContainerTop}>
            <img
              src={item.img}
              className={styles.productImage}
              alt="Product image"
            />
            <div className={styles.cardConatinerLike}>
              <img
                onClick={handleClickLike}
                src={isLiked ? item.likeIcon : item.likeIconClick}
                alt="Like"
                className={styles.likeIcon}
              />
              <img
                src={item.colorPalette}
                className={styles.colorPalette}
                alt="Palette image"
              />
            </div>
          </div>
          <div className={styles.cardContainerBottom}>
            <h3>{item.title}</h3>
            <Rate className={styles.cardRate} />
            <div className={styles.cardPriceContainer}>
              <p>{item.price}</p>
              <img
                onClick={handleClickBuy}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                src={
                  isMouseDown
                    ? item.basketIconClick
                    : isHovered
                      ? item.basketIconHover
                      : item.basketIcon
                }
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
