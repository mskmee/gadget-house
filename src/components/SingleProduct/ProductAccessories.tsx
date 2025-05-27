import { FC } from 'react';

import style from './Product.module.scss';
import SliderBase from '@/UI/Slider/SliderBase/SliderBase';
import useLocalStorage from '@/hooks/useLocalStorage';
import { IProductCard } from '@/interfaces/interfaces';
import { ArrowNext, ArrowPrev } from '@/UI/Slider/SliderArrows/SliderArrow';
import SmallSliderArrowPrev from '@/assets/icons/SmallSliderArrowPrev';
import SmallSliderArrowNext from '@/assets/icons/SmallSliderArrowNext';
import { useMediaQuery } from 'react-responsive';
import { Navigation } from 'swiper/modules';
import { MyCard } from '../components';
import classNames from 'classnames';

export const ProductAccessories: FC = () => {
  const isMobile = useMediaQuery({query: '(max-width: 991px)',})
  const shouldShowNavigation = isMobile ? false : true;

  const [previouslyReviewed] = useLocalStorage<IProductCard[]>(
    'previouslyReviewed',
    [],
  );

  return (
    <section className={style['accessories']} id="product-accessories">
      <div>
        <h2>Previously reviewed offers</h2>
        <div className={classNames('base-slider', style['product-accessories__slider'])}>
          <SliderBase 
            prevArrow={<ArrowPrev classNameArrow={['arrowLeft', 'base__slider-arrow']}><SmallSliderArrowPrev/></ArrowPrev>}
            nextArrow={<ArrowNext classNameArrow={['arrowLeft', 'base__slider-arrow']}><SmallSliderArrowNext/></ArrowNext>}
            modules={[Navigation]}
            navigation={shouldShowNavigation}
            // slidesPerView={2.5}
            breakpoints={{
              320: {
                slidesPerView: 1.5,
                spaceBetween: '10px'
              },
              575: {
                slidesPerView: 2,
                spaceBetween: '10px'
              },
              640: {
                slidesPerView: 2.4,
                spaceBetween: '10px'
              },
              768: {
                slidesPerView: 3,
                spaceBetween: '10px',
              },
              1100: {
                slidesPerView: 4,
                spaceBetween: '40'
              },
            }}
          >

            {
              previouslyReviewed?.map(product => (
                <MyCard 
                  key={product.id} 
                  classname="previously-reviewed"
                  tempProduct={product}
                />
              ))
            }

          </SliderBase>
        </div>
      </div>
    </section>
  );
};
