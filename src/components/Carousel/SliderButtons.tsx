import React from 'react';
import { SliderButtonProps } from '@/interfaces/interfaces';

const SliderButtons: React.FC<SliderButtonProps> = ({
  handlePrevClick,
  handleNextClick,
  isFirstSlick,
  isLastSlick,
}) => {
  return (
    <div className="arrow-container">
      <div className="slider-buttons">
        <button
          className={
            isFirstSlick ? 'btn-arrow-prev disabled' : 'btn-arrow-prev'
          }
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
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className={isLastSlick ? 'btn-arrow-next disabled' : 'btn-arrow-next'}
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
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SliderButtons;
