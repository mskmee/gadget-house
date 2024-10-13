import React from 'react';
import { Link } from 'react-router-dom';
import styles from './slidernav.module.scss';

import { useState } from 'react';
import { RightArrowSlider, RightArrowSliderClick } from '@/assets/constants';
import { TextLink } from '@/types/TextLink';

export default function SliderNav({ text, link }: TextLink) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation;
    setIsClicked((prevState) => !prevState);
  };
  return (
    <div className={styles.sliderText}>
      <h2>{text}</h2>
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
        <hr
          className={`${styles.buttonHr} ${isClicked ? styles.buttonHrActive : ''}`}
        />
      </Link>
    </div>
  );
}
