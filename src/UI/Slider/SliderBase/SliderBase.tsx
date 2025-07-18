import React, { useRef } from 'react';
import { SliderBaseProps } from '../type/interfaces';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import SliderCustomArrows from '../SliderCustomArrows/SliderCustomArrows';

import "../ganeralSliderStyle.scss"

// eslint-disable-next-line no-unused-vars
function SliderBase({spaceBetween, slidesPerView, pagination=true, children, navigation = false, className, prevArrow, nextArrow, onSlideChange, breakpoints, ...props}: SliderBaseProps) {
  const prevButtonRef = useRef<HTMLDivElement | null>(null);
  const nextButtonRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className='relative'>
      <Swiper
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        breakpoints={breakpoints}
        navigation={navigation ? {
          prevEl: prevButtonRef.current,
          nextEl: nextButtonRef.current,
        } : false}
        pagination={pagination ? { clickable: true } : false}
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
        <div className='slider-nav__arrows'>
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