import { useEffect, useRef, useState } from 'react';
import { Carousel as AntCarousel } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import styles from './carousel.module.css';
import SliderButtons from './SliderButtons';
import { ChildCard } from '../../types/ChildCard';

const Carousels = ({ children, className, responsive }: ChildCard) => {
  const ref = useRef<CarouselRef | null>(null);
  const [prevClick, setPrevClick] = useState(false);
  const [nextClick, setNextClick] = useState(false);

  const [isLastSlick, setIsLastSlick] = useState(Boolean);
  const [isFirstSlick, setIsFirstSlick] = useState(Boolean);

  const handlePrevClick = () => {
    setPrevClick(true);
    ref.current?.prev();
  };

  const handleNextClick = () => {
    setNextClick(true);
    ref.current?.next();
  };

  return (
    <div
      className={`${styles.carouselContainer} ${className ? styles[className] : ''}`}
    >
      <AntCarousel
        ref={ref}
        slidesToShow={5}
        slidesToScroll={1}
        autoplay={false}
        dots={false}
        initialSlide={0}
        className={styles.carousel}
        arrows={false} // Disable default arrows to use custom ones
        responsive={
          responsive || [
            {
              breakpoint: 3200,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1700,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1070,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 700,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
          ]
        }
      >
        {Array.from(Array(8), (_, i) => (
          <div key={i}>{children}</div>
        ))}
      </AntCarousel>
      <SliderButtons
        handleNextClick={handleNextClick}
        handlePrevClick={handlePrevClick}
        isFirstSlick={isFirstSlick}
        isLastSlick={isLastSlick}
      />
    </div>
  );
};

export default Carousels;
