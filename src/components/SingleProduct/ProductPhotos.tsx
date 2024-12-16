import { FC } from 'react';
import style from './Product.module.scss';
import Carousels from '../Carousel/Carousel';
import { productImages } from '@/constants/singleProduct';

export const ProductPhotos: FC = () => {
  return (
    <section className={style['photos']} id="product-photos">
      <h2>Photos</h2>

      {productImages?.length > 0 ? (
        <>
          <Carousels classname="photos-carousel" />
        </>
      ) : (
        <p>There are any photo</p>
      )}
    </section>
  );
};
