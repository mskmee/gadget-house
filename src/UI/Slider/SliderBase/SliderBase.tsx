import React, { useRef, useEffect } from 'react';
import { SliderBaseProps } from '../type/interfaces';
import { Swiper, SwiperSlide } from 'swiper/react';
import SliderCustomArrows from '../SliderCustomArrows/SliderCustomArrows';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../ganeralSliderStyle.scss';

// eslint-disable-next-line no-unused-vars
function SliderBase({
  spaceBetween,
  slidesPerView,
  pagination = true,
  children,
  navigation = false,
  className,
  prevArrow,
  nextArrow,
  onSlideChange,
  breakpoints,
  ...props
}: SliderBaseProps) {
  const prevButtonRef = useRef<HTMLDivElement | null>(null);
  const nextButtonRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<any>(null);

  const handleSwiperInit = (swiper: any) => {
    swiperRef.current = swiper;

    if (navigation && prevButtonRef.current && nextButtonRef.current) {
      swiper.params.navigation.prevEl = prevButtonRef.current;
      swiper.params.navigation.nextEl = nextButtonRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  };

  useEffect(() => {
    if (
      swiperRef.current &&
      navigation &&
      prevButtonRef.current &&
      nextButtonRef.current
    ) {
      const swiper = swiperRef.current;
      swiper.params.navigation.prevEl = prevButtonRef.current;
      swiper.params.navigation.nextEl = nextButtonRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [navigation]);

  return (
    <div className="relative">
      <Swiper
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        breakpoints={breakpoints}
        navigation={
          navigation
            ? {
                prevEl: prevButtonRef.current,
                nextEl: nextButtonRef.current,
              }
            : false
        }
        pagination={pagination ? { clickable: true } : false}
        onBeforeInit={handleSwiperInit}
        onSwiper={handleSwiperInit}
        {...props}
        className={className}
        onSlideChange={(swiper) => {
          if (onSlideChange) {
            onSlideChange(swiper);
          }
        }}
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
      </Swiper>

      {navigation && (
        <div className="slider-nav__arrows">
          <SliderCustomArrows
            prevButtonRef={prevButtonRef}
            nextButtonRef={nextButtonRef}
            prevArrow={prevArrow}
            nextArrow={nextArrow}
          />
        </div>
      )}
    </div>
  );
}

export default SliderBase;
