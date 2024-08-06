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

  const [isLastSlick, setIsLastSlick] = useState(false);
  const [isFirstSlick, setIsFirstSlick] = useState(true); // Initialize as true because we start at the first slide
  const [currentSlickIndex, setCurrentSlickIndex] = useState(0);

  const handlePrevClick = () => {
    setPrevClick(true);
    ref.current?.prev();
    setTimeout(() => setPrevClick(false), 0);
  };

  const handleNextClick = () => {
    setNextClick(true);
    ref.current?.next();
    setTimeout(() => setNextClick(false), 0);
  };

  useEffect(() => {
    const a = document.querySelector<HTMLElement>(
      `${styles.carouselContainer}`,
    );
    const b = document.body.offsetWidth + 16;

    if (a) {
      if (b > 1550 && b < 2100) {
        a.style.marginRight = `calc(1px + (30 - 0) * ((100vw - 1550px) / (${b} - 1540)))`;
      }
    }

    // Update indicators based on current slide index
    const totalSlides = Array.isArray(children) ? children.length : 0;
    setIsFirstSlick(currentSlickIndex === 0);
    setIsLastSlick(currentSlickIndex === totalSlides - 1);
  }, [prevClick, nextClick, currentSlickIndex, children]);

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
        arrows={false}
        beforeChange={(current, next) => setCurrentSlickIndex(next)}
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
