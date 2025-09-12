import { FC } from 'react';
import classNames from 'classnames';
import styles from './slidernav.module.scss';
// import { Link } from 'react-router-dom';
// import { SliderRightArrow } from '@/assets/icons/SliderRightArrow';
interface ISliderNavProps {
  text: string;
  link: string;
  isVisibleSeeMoreBtn?: boolean;
}

export const SliderNav: FC<ISliderNavProps> = ({
  text,
  // link,
  // isVisibleSeeMoreBtn = true,
}) => {
  return (
    <div className={classNames(styles.sliderText)}>
      <h2>{text}</h2>
      {/* {isVisibleSeeMoreBtn && (
        <Link to={link} className={styles.buttonLink}>
          <p>See more</p>
          <SliderRightArrow />
        </Link>
      )} */}
    </div>
  );
};
