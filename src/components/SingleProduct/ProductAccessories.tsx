import React, { FC } from 'react';
import { productAccessoriesData } from '../Card/constants';
import Carousels from '../Carousel/Carousel';
import style from './SingleProduct.module.scss';
import { MyCard } from '../Card/MyCard';

export const ProductAccessories: FC = () => {
  return (
    <section className={style['accessories']} id="product-accessories">
      <div className={style['single-product__wrap']}>
        <h2>Accessories</h2>
      </div>
      <Carousels
        classname="accessories-carousel"
        sliderClassName="accessories-slider"
        countSlideToShow={4}
      >
        {productAccessoriesData?.map((accessory) => (
          <React.Fragment key={accessory?.id}>
            <MyCard product={accessory} classname="accessories-colors" />
          </React.Fragment>
        ))}
      </Carousels>
    </section>
  );
};
