import { FC } from 'react';
import style from './Product.module.scss';
import {
  productImg1,
  productImg2,
  productImg3,
  productImg4,
  productImg5,
  productImg6,
} from '@/assets/constants';

import Carousels from '../Carousel/Carousel';
import { photosResponsive } from '@/constants/carouselResponsive';

const productImages = [
  { id: 1, img: productImg1 },
  { id: 2, img: productImg2 },
  { id: 3, img: productImg3 },
  { id: 4, img: productImg4 },
  { id: 5, img: productImg5 },
  { id: 6, img: productImg6 },
];

export const ProductPhotos: FC = () => {
  return (
    <section className={style['photos']} id="product-photos">
      <h2>Photos</h2>

      {productImages?.length > 0 ? (
        <>
          <Carousels
            classname="photos-carousel"
            sliderClassName="photos-slider"
            countSlideToShow={3}
            responsive={photosResponsive}
          >
            {productImages?.map((photo) => (
              <img
                key={photo?.id}
                className="product-photo"
                src={photo?.img}
                alt="product's photos"
              />
            ))}
          </Carousels>
        </>
      ) : (
        <p>There are any photo</p>
      )}
    </section>
  );
};
