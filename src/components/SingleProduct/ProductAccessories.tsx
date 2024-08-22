import React, { FC } from 'react';
import SmartphoneCard from '../Card/SmartphoneCard';
import { productAccessories } from '../Card/constants';
import Carousels from '../Carousel/Carousel';
import style from './SingleProduct.module.scss';

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
        {productAccessories?.map((accessory) => (
          <React.Fragment key={accessory?.id}>
            <SmartphoneCard
              product={accessory}
              classname="accessories-colors"
            />
          </React.Fragment>
        ))}
      </Carousels>
    </section>
  );
};
