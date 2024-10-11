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
  const containerRef = useRef<HTMLDivElement>(null);

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
    if (containerRef.current) {
      const allSlicks = containerRef.current.querySelectorAll('.slick-slide');
      const filteredElements = Array.from(allSlicks).filter(
        (element) => !element.classList.contains('slick-cloned'),
      );

      const activeSlicks =
        containerRef.current.querySelectorAll('.slick-active');
      const currentSlickElement =
        containerRef.current.querySelector('.slick-current');
      const currentSlickIndex = currentSlickElement?.getAttribute('data-index');
      const currentSlickIndex2 =
        activeSlicks[activeSlicks.length - 1]?.getAttribute('data-index');

      if (currentSlickIndex2 !== null && currentSlickIndex2 !== undefined) {
        setIsLastSlick(+currentSlickIndex2 >= filteredElements.length - 1);
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
    }
  }, [prevClick, nextClick]);

  useEffect(() => {
    const allSlideElements = Array.from(
      containerRef.current?.querySelectorAll('.slick-track .slick-slide') || [],
    );
    const dataIndexLessThanZero = allSlideElements.filter((el) => {
      const dataIndex = el.getAttribute('data-index');
      return dataIndex !== null && Number(dataIndex) < 0;
    });

    const dataIndexMoreThanZero = allSlideElements.filter((el) => {
      const dataIndex = el.getAttribute('data-index');
      return dataIndex !== null && Number(dataIndex) >= 0;
    });

    dataIndexLessThanZero?.map((el) => {
      el.removeAttribute('tabindex');
      const childrenWithTabindex2 = el.querySelector('a');
      childrenWithTabindex2?.remove();
    });

    dataIndexMoreThanZero?.map((el) => {
      if (el.classList.contains('slick-active')) {
        el.removeAttribute('tabindex');
        const childrenWithTabindex = el.querySelectorAll('[tabindex]');
        childrenWithTabindex.forEach((el) => el.removeAttribute('tabindex'));
      } else {
        el.removeAttribute('tabindex');
        const childrenWithTabindex2 = el.querySelector('a');
        childrenWithTabindex2?.remove();
      }
    });
  }, []);

  return (
    <div
      className={`${style.carouselContainer} ${classname}`}
      style={
        classname === 'photos-carousel'
          ? { backgroundColor: 'transparent' }
          : {}
      }
      ref={containerRef}
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
