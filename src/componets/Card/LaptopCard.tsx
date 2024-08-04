import React, { useState } from 'react';
import { laptopData } from './constants';
import styles from './card.module.css';
import { Card, Rate } from 'antd';

export default function LaptopCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isLiked, setIsLiked] = useState(true);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleClickBuy = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 150);
  };

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleClickLike = () => {
    setIsLiked((prevState) => !prevState);
  };

  return (
    <div>
      {laptopData.map((item) => (
        <Card className={styles.cardConatiner} key={item.id}>
          <div className={styles.cardContainerTop}>
            <img src={item.img} className={styles.productImage} />
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
        </Card>
      ))}
    </div>
  );
}
