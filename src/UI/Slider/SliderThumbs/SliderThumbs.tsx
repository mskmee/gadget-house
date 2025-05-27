import  { useEffect, useState } from 'react';

import { FreeMode, Navigation, Thumbs,Pagination } from 'swiper/modules';
import { SliderThumbsProps } from '../type/interfaces';
import { Swiper } from 'swiper/types';
import SliderBase from '../SliderBase/SliderBase';
import classNames from 'classnames';

function SliderThumbs({data, prevArrow, nextArrow, currentSlide, classNameThumb, slidesPerView, spaceBetween, classNameMain, isMobile, onSlideChange, breakpointsThumbs}: SliderThumbsProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper | null>(null);
  const [mainSwiper, setMainSwiper] = useState<Swiper | null>(null);

  useEffect(() => {
    if (thumbsSwiper && currentSlide?.id) {
      thumbsSwiper.slideTo(currentSlide.id - 1);
    }
    if (mainSwiper && currentSlide?.id) {
      mainSwiper.slideTo(currentSlide.id - 1);
    }
  }, [currentSlide, thumbsSwiper, mainSwiper]);


  return (
    <>
      <SliderBase 
        onSwiper={setMainSwiper}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        className={classNames('mainSlider', classNameMain)}
        pagination={isMobile ?? true}
        prevArrow={prevArrow}
        nextArrow={nextArrow}
        onSlideChange={({ realIndex }: { realIndex: number }) => {
          if (onSlideChange) {
            onSlideChange(realIndex);
          }
        }}
      >
        {data.map((image, index) => (
          <div style={{ cursor: 'pointer' }} key={index}>
            <img src={image.link} alt={`main-slide-${index}`} />
          </div>
        ))}
      </SliderBase>

      {!isMobile && (<SliderBase
        onSwiper={setThumbsSwiper}
        spaceBetween={spaceBetween}
        navigation={false}
        pagination={false}
        watchSlidesProgress={true}
        breakpoints={breakpointsThumbs}
        slidesPerView={slidesPerView}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        className={classNames('thumb-wrapper', classNameThumb)}
      >
        {data.map((image, index) => (
          <div style={{ cursor: 'pointer' }} key={index}>
            <img src={image.link} alt={`main-slide-${index}`} />
          </div>
        ))}
      </SliderBase>)}
    </>
  );
}

export default SliderThumbs;