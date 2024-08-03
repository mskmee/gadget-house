import React, { useEffect, useRef, useState } from 'react';
import { Carousel as AntCarousel } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import styles from './carousel.module.css';
import ProductCard from '../Card/Card';
import SliderButtons from './SliderButtons';

const Carousels: React.FC = () => {
  const ref = useRef<CarouselRef | null>(null);
  const [prevClick, setPrevClick] = useState(false);
  const [nextClick, setNextClick] = useState(false);

  const [isLastSlick, setIsLastSlick] = useState(Boolean);
  const [isFirstSlick, setIsFirstSlick] = useState(Boolean);
  // const [currentSlickIndex, setCurrentSlickIndex] = useState(0);

  const handlePrevClick = () => {
    setPrevClick(true);
    ref.current?.prev();
    setTimeout(() => setPrevClick(false), 0); // Reset click state after 200ms
  };

  const handleNextClick = () => {
    setNextClick(true);
    ref.current?.next();
    setTimeout(() => setNextClick(false), 0); // Reset click state after 200ms
  };

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <div className={styles.carouselContainer}>
      <AntCarousel
        ref={ref}
        afterChange={onChange}
        slidesToShow={5}
        slidesToScroll={1}
        autoplay={false}
        dots={false}
        initialSlide={0}
        className={styles.carousel}
        arrows={false} // Disable default arrows to use custom ones
        responsive={[
          {
            breakpoint: 3200,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1420,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 450,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
        ]}
      >
        {Array.from(Array(8), (_, i) => (
          <div key={i}>
            <ProductCard />
          </div>
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
