import { useEffect } from 'react';
import Benefits from '@/components/benefitsList/benefits';
import { BrandCard } from '@/components/Card/BrandCard';
import Carousels from '@/components/Carousel/Carousel';
import { SliderNav } from '@/components/SliderNav/SliderNav';
import { MyCard } from '@/components/Card/MyCard';
import {
  smartphoneData,
  laptopData,
  brandData,
  previouslyReviewedData,
} from '@/components/Card/constants';
import { MainIntro } from '@/components/MainIntro';
import { useTypedSelector, useActions } from '@/hooks/hooks';
import { DataStatus } from '@/enums/enums';
import { MainPageSkeleton } from '@/components/skeletons/MainPageSkeleton';

export default function Main() {
  const { getAllProducts } = useActions();
  const isProductsLoading = useTypedSelector(
    (state) => state.products.dataStatus === DataStatus.PENDING,
  );

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  return (
    <>
      <MainIntro />
      {isProductsLoading ? (
        <MainPageSkeleton />
      ) : (
        <>
          <SliderNav text="Smartphone" link="/smartphones" />
          <Carousels classname="smartphone-carousel">
            {Array.from({ length: 8 }, (_, i) => (
              <MyCard
                key={`smartphone-${i}`}
                product={smartphoneData[i % smartphoneData.length]}
                classname="smartphone"
              />
            ))}
          </Carousels>

          <Carousels classname="brands-carousel">
            {Array.from({ length: 10 }, (_, i) => (
              <BrandCard
                key={`brand-${i}`}
                product={brandData[i % brandData.length]}
              />
            ))}
          </Carousels>

          <SliderNav text="Laptop" link="/laptops" />
          <Carousels classname="laptop-carousel">
            {Array.from({ length: 8 }, (_, i) => (
              <MyCard
                key={`laptop-${i}`}
                product={laptopData[i % laptopData.length]}
                classname="laptop"
              />
            ))}
          </Carousels>

          <SliderNav text="Previously reviewed offers" link="/viewed" />
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
        </>
      )}

      <Benefits />
    </>
  );
}
