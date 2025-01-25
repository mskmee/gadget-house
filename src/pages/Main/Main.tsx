import { useEffect } from 'react';
import Benefits from '@/components/benefitsList/benefits';
import Carousels from '@/components/Carousel/Carousel';
import { SliderNav } from '@/components/SliderNav/SliderNav';
import { MainIntro } from '@/components/MainIntro';
import { useTypedSelector, useActions } from '@/hooks/hooks';
import { DataStatus } from '@/enums/enums';
import { MainPageSkeleton } from '@/components/skeletons/MainPageSkeleton';
import { useMediaQuery } from 'react-responsive';

export default function Main() {
  const { getAllProducts } = useActions();
  const isProductsLoading = useTypedSelector(
    (state) => state.products.dataStatus === DataStatus.PENDING,
  );
  const isLargerThan450px = useMediaQuery({
    query: '(max-width: 450px)',
  });

  useEffect(() => {
    getAllProducts(0);
  }, [getAllProducts]);

  return (
    <>
      <MainIntro />
      {isProductsLoading ? (
        <MainPageSkeleton />
      ) : (
        <>
          <SliderNav text="Smartphone" link="/smartphones" />
          <Carousels classname="smartphone-carousel" />

          <Carousels classname="brands-carousel" />

          <SliderNav text="Laptop" link="/laptops" />
          <Carousels classname="laptop-carousel" />

          <SliderNav
            text={
              isLargerThan450px
                ? 'Previously reviewed'
                : 'Previously reviewed offers'
            }
            link="/viewed"
          />
          <Carousels classname="viewed-carousel" />
        </>
      )}
      <Benefits />
    </>
  );
}
