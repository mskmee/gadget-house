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
    const allSlicks = document.querySelectorAll<HTMLElement>(
      `.${styles.carouselContainer} .slick-slide`,
    );
    const filteredElements = Array.from(allSlicks).filter(
      (element) => !element.classList.contains('slick-cloned'),
    );
    const activeSlicks = document.querySelectorAll<HTMLElement>(
      `.${styles.carouselContainer}  .slick-active`,
    );
    const currentSlickElement = document.querySelector<HTMLElement>(
      `.${styles.carouselContainer} .slick-current`,
    );

    const currentSlickIndex = currentSlickElement?.getAttribute('data-index');
    const lastActiveSlickIndex =
      activeSlicks[activeSlicks.length - 1]?.getAttribute('data-index');

    if (
      lastActiveSlickIndex &&
      +lastActiveSlickIndex === filteredElements.length - 1
    ) {
      setIsLastSlick(true);
    } else {
      setIsLastSlick(false);
    }

    if (currentSlickIndex && +currentSlickIndex === 0) {
      setIsFirstSlick(true);
    } else {
      setIsFirstSlick(false);
    }
  }, [prevClick, nextClick, currentSlickIndex]);

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
        beforeChange={(next) => setCurrentSlickIndex(next)}
        initialSlide={0}
        className={styles.carousel}
        arrows={false}
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
