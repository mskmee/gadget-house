import { FC } from 'react';
import style from './Product.module.scss';
import Carousels from '../Carousel/Carousel';
import { ProductImageCard } from '@/interfaces/interfaces';

interface IProductPhotosProps {
  productImageCards: ProductImageCard[];
}

export const ProductPhotos: FC<IProductPhotosProps> = ({
  productImageCards,
}) => {
  return (
    <section className={style['photos']} id="product-photos">
      <h2>Photos</h2>

      {productImageCards?.length > 0 ? (
        <>
          <Carousels
            classname="photos-carousel"
            productImageCards={productImageCards}
          />
        </>
      ) : (
        <p>There are any photo</p>
      )}
    </section>
  );
};
