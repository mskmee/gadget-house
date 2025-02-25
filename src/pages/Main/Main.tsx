import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination';
import {
  LocalStorageKey,
  localStorageService,
} from '@/utils/packages/local-storage';
import { useTypedSelector, useActions } from '@/hooks/hooks';
import { useMediaQuery } from 'react-responsive';
import { getUserData } from '@/store/auth/actions';
import { AppDispatch } from '@/store';
import { DataStatus } from '@/enums/enums';
import Benefits from '@/components/benefitsList/benefits';
import Carousels from '@/components/Carousel/Carousel';
import { SliderNav } from '@/components/SliderNav/SliderNav';
import { MainIntro } from '@/components/MainIntro';
import { MainPageSkeleton } from '@/components/skeletons/MainPageSkeleton';

export default function Main() {
  const dispatch: AppDispatch = useDispatch();
  const { getAllProducts } = useActions();
  const isProductsLoading = useTypedSelector(
    (state) => state.products.dataStatus === DataStatus.PENDING,
  );
  const isLargerThan450px = useMediaQuery({
    query: '(max-width: 450px)',
  });

  useEffect(() => {
    const token = localStorageService.getItem(LocalStorageKey.REFRESH_TOKEN);
    if (token) {
      dispatch(getUserData());
    }
  }, [dispatch]);

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
