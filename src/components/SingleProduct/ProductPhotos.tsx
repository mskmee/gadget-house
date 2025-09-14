import { FC } from 'react';
import style from './Product.module.scss';
import { TProductImageCard } from '@/interfaces/interfaces';
import SliderBase from '@/UI/Slider/SliderBase/SliderBase';
import { ArrowNext, ArrowPrev } from '@/UI/Slider/SliderArrows/SliderArrow';
import SmallSliderArrowPrev from '@/assets/icons/SmallSliderArrowPrev';
import SmallSliderArrowNext from '@/assets/icons/SmallSliderArrowNext';
import { Navigation } from 'swiper/modules';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';

interface IProductPhotosProps {
  productImageCards: TProductImageCard[];
}

export const ProductPhotos: FC<IProductPhotosProps> = ({
  productImageCards,
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' });
  const shouldShowNavigation = isMobile ? false : true;
  return (
    <section className={style['photos']} id="product-photos">
      <h2 className={style['product-photos__title']}>Photos</h2>

      {productImageCards?.length > 0 ? (
        <div
          className={classNames('base-slider', style['product-photos__slider'])}
        >
          <SliderBase
            prevArrow={
              <ArrowPrev classNameArrow={['arrowLeft', 'base__slider-arrow']}>
                <SmallSliderArrowPrev />
              </ArrowPrev>
            }
            nextArrow={
              <ArrowNext classNameArrow={['arrowLeft', 'base__slider-arrow']}>
                <SmallSliderArrowNext />
              </ArrowNext>
            }
            modules={[Navigation]}
            navigation={shouldShowNavigation}
            slidesPerView={2.5}
            breakpoints={{
              575: {
                slidesPerView: 2,
                spaceBetween: '10px',
              },
              640: {
                slidesPerView: 2.5,
                spaceBetween: '20px',
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: '30px',
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: '40px',
              },
            }}
          >
            {productImageCards?.map((productImageCard) => (
              <img
                key={crypto.randomUUID()}
                className="product-photo"
                src={productImageCard.link}
                alt="product's photos"
              />
            ))}
          </SliderBase>
        </div>
      ) : (
        <p>There are any no photos</p>
      )}
    </section>
  );
};
