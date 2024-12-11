import { FC } from 'react';
import { previouslyReviewedData } from '../Card/constants';
import Carousels from '../Carousel/Carousel';
import style from './Product.module.scss';
import { MyCard } from '../Card/MyCard';

export const ProductAccessories: FC = () => {
  return (
    <section className={style['accessories']} id="product-accessories">
      <div>
        <h2>Previously reviewed offers</h2>
        <Carousels classname="viewed-carousel">
          {Array.from(Array(8), (_, i) => (
            <MyCard
              key={`reviewed-${i}`}
              product={
                previouslyReviewedData[i % previouslyReviewedData.length]
              }
              classname="previously-reviewed"
              index={i}
            ></MyCard>
          ))}
        </Carousels>
      </div>
    </section>
  );
};
