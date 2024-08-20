import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import style from './carousel.module.css';
import { Carousel } from 'antd';
import SliderButtons from './SliderButtons';
import { ResponsiveSettings } from '../../types/responsive';
import type { CarouselRef } from 'antd/es/carousel';

interface ICarouselsProps {
  children: ReactNode;
  classname: string;
  sliderClassName: string;
  countSlideToShow: number;
  responsive?: ResponsiveSettings[];
}

const Carousels: FC<ICarouselsProps> = ({
  children,
  classname,
  sliderClassName,
  countSlideToShow,
  responsive,
}) => {
  const ref = useRef<CarouselRef>(null);
  const [prevClick, setPrevClick] = useState(false);
  const [nextClick, setNextClick] = useState(false);
  const [isFirstSlick, setIsFirstSlick] = useState(true);
  const [isLastSlick, setIsLastSlick] = useState(false);

  console.log(children);

  const handlePrevClick = () => {
    setPrevClick(true);
    ref.current?.prev();
    setTimeout(() => setPrevClick(false), 0); // Reset click state after 0s
  };

  const handleNextClick = () => {
    setNextClick(true);
    ref.current?.next();
    setTimeout(() => setNextClick(false), 0); // Reset click state after 0s
  };
  useEffect(() => {
    const allSlicks = document.querySelectorAll(`.${classname} .slick-slide`);

    const filteredElements = Array.from(allSlicks).filter(
      (element) => !element.classList.contains('slick-cloned'),
    );
    const activeSlicks = document.querySelectorAll(
      `.${classname} .slick-active`,
    );

    const currentSlickIndex = document
      .querySelector(`.${classname} .slick-current`)
      ?.getAttribute('data-index');

    const currentSlickIndex2 =
      activeSlicks[activeSlicks?.length - 1]?.getAttribute('data-index');

    if (currentSlickIndex2 !== null) {
      setIsLastSlick(
        +currentSlickIndex2 >= (filteredElements?.length ?? 0) - 1,
      );
    } else {
      setIsLastSlick(false);
    }
    if (
      currentSlickIndex !== null &&
      currentSlickIndex !== undefined &&
      +currentSlickIndex === 0
    ) {
      setIsFirstSlick(true);
    } else {
      setIsFirstSlick(false);
    }
  }, [prevClick, nextClick]);

  return (
    <div
      className={`${style.carouselContainer} ${classname}`}
      style={
        classname === 'photos-carousel'
          ? { backgroundColor: 'transparent' }
          : {}
      }
    >
      <Carousel
        className={sliderClassName}
        ref={ref}
        slidesToShow={countSlideToShow}
        slidesToScroll={1}
        autoplay={false}
        dots={false}
        initialSlide={0}
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
        {children}
      </Carousel>
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
