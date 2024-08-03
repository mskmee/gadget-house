import React from 'react';
import styles from './carousel.module.css';

interface SliderButtonProps {
  handlePrevClick: (event: React.MouseEvent) => void;
  handleNextClick: (event: React.MouseEvent) => void;
  isFirstSlick: any;
  isLastSlick: any;
}

const SliderButtons: React.FC<SliderButtonProps> = ({
  handlePrevClick,
  handleNextClick,
  isFirstSlick,
  isLastSlick,
}) => {
  return (
    <div className={styles.sliderButtons}>
      <button
        className={`${styles.btnArrowPrev} ${isFirstSlick ? styles.disabled : ''}`}
        disabled={isFirstSlick ? true : false}
        onClick={handlePrevClick}
      >
        <svg
          width="9"
          height="16"
          viewBox="0 0 9 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.00016 1.33331L1.3335 7.99998L8.00016 14.6666"
            stroke="#00820D"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <button
        className={`${styles.btnArrowNext} ${isLastSlick ? styles.disabled : ''}`}
        disabled={isLastSlick ? true : false}
        onClick={handleNextClick}
      >
        <svg
          width="9"
          height="16"
          viewBox="0 0 9 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.3335 1.33331L8.00016 7.99998L1.3335 14.6666"
            stroke="#00820D"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default SliderButtons;
