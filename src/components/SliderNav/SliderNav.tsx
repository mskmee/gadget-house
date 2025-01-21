import { FC, MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './slidernav.module.scss';
import { RightArrowSlider, RightArrowSliderClick } from '@/assets/constants';

interface ISliderNavProps {
  text: string;
  link: string;
  isVisibleSeeMoreBtn?: boolean;
}

export const SliderNav: FC<ISliderNavProps> = ({
  text,
  link,
  isVisibleSeeMoreBtn = true,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (event: MouseEvent) => {
    event.stopPropagation;
    setIsClicked((prevState) => !prevState);
  };
  return (
    <div className={styles.sliderText}>
      <h2>{text}</h2>
      {isVisibleSeeMoreBtn && (
        <Link to={link} className={styles.buttonContent} onClick={handleClick}>
          <div
            className={`${styles.buttonLink} ${isClicked ? styles.buttonLinkActive : ''}`}
          >
            <p>See more</p>
            <img
              src={isClicked ? RightArrowSliderClick : RightArrowSlider}
              alt="Right icon"
            />
          </div>
        </Link>
      )}
    </div>
  );
};
