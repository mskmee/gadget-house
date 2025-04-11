import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './slidernav.module.scss';

import { SliderRightArrow } from '@/assets/icons/SliderRightArrow';
import classNames from 'classnames';

interface ISliderNavProps {
  text: string;
  link: string;
  isVisibleSeeMoreBtn?: boolean;
  className?: string;
}

export const SliderNav: FC<ISliderNavProps> = ({
  text,
  link,
  isVisibleSeeMoreBtn = true,
  className,
}) => {
  return (
    <div className={classNames(styles.sliderText, className)}>
      <h2>{text}</h2>
      {isVisibleSeeMoreBtn && (
        <Link to={link} className={styles.buttonLink}>
          <p>See more</p>
          <SliderRightArrow />
        </Link>
      )}
    </div>
  );
};
