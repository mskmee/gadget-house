import { FC } from 'react';
import Carousels from '../Carousel/Carousel';
import style from './Product.module.scss';

export const ProductAccessories: FC = () => {
  return (
    <section className={style['accessories']} id="product-accessories">
      <div>
        <h2>Previously reviewed offers</h2>
        <Carousels classname="viewed-carousel" />
      </div>
    </section>
  );
};
