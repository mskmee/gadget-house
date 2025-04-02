import { useEffect } from 'react';
import Benefits from '@/components/benefitsList/benefits';
import Carousels from '@/components/Carousel/Carousel';
import { SliderNav } from '@/components/SliderNav/SliderNav';
import { MainIntro } from '@/components/MainIntro';
import { useTypedSelector, useActions } from '@/hooks/hooks';
import { DataStatus } from '@/enums/enums';
import { MainPageSkeleton } from '@/components/skeletons/MainPageSkeleton';
import { useMediaQuery } from 'react-responsive';
import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination';
import { IProductCard } from '@/interfaces/interfaces';
import useLocalStorage from '@/hooks/useLocalStorage';

export default function Main() {
  const { getAllProducts } = useActions();
  const isProductsLoading = useTypedSelector(
    (state) => state.products.dataStatus === DataStatus.PENDING,
  );
  const [previouslyReviewed] = useLocalStorage<IProductCard[]>(
    'previouslyReviewed',
    [],
  );
  const isLargerThan450px = useMediaQuery({
    query: '(max-width: 450px)',
  });

  useEffect(() => {
    getAllProducts({ page: DEFAULT_PAGE, size: DEFAULT_SIZE });
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

          {previouslyReviewed.length > 0 && (
            <>
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
        </>
      )}
      <Benefits />
    </>
  );
}
