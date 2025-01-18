import { FC } from 'react';
import style from './Product.module.scss';
import Carousels from '../Carousel/Carousel';

interface IProductPhotosProps {
  productImages: string[];
}

export const ProductPhotos: FC<IProductPhotosProps> = ({ productImages }) => {
  return (
    <section className={style['photos']} id="product-photos">
      <h2>Photos</h2>

      {productImages?.length > 0 ? (
        <>
          <Carousels
            classname="photos-carousel"
            productImages={productImages}
          />
        </>
      ) : (
        <p>There are any photo</p>
      )}
    </section>
  );
};
