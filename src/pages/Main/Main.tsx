import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  LocalStorageKey,
  localStorageService,
} from '@/utils/packages/local-storage';
import { useTypedSelector, useActions } from '@/hooks/hooks';
import { getUserData } from '@/store/auth/actions';
import { AppDispatch } from '@/store';
import { AppRoute, DataStatus } from '@/enums/enums';
import Benefits from '@/components/benefitsList/benefits';
import Carousels from '@/components/Carousel/Carousel';
import { SliderNav } from '@/components/SliderNav/SliderNav';
import { MainIntro } from '@/components/MainIntro';
import { MainPageSkeleton } from '@/components/skeletons/MainPageSkeleton';
import { useMediaQuery } from 'react-responsive';
import { DEFAULT_PAGE, DEFAULT_SIZE_ALL } from '@/constants/pagination';
import { IProductCard } from '@/interfaces/interfaces';
import useLocalStorage from '@/hooks/useLocalStorage';

export default function Main() {
  const dispatch: AppDispatch = useDispatch();
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
    const token = localStorageService.getItem(LocalStorageKey.REFRESH_TOKEN);
    if (token) {
      dispatch(getUserData());
    }
  }, [dispatch]);

  useEffect(() => {
    getAllProducts({ page: DEFAULT_PAGE, size: DEFAULT_SIZE_ALL });
  }, [getAllProducts]);

  return (
    <>
      <MainIntro />
      {isProductsLoading ? (
        <MainPageSkeleton />
      ) : (
        <>
          <SliderNav text="Smartphone" link={AppRoute.SMARTPHONES} />
          <Carousels classname="smartphone-carousel" />

          <Carousels classname="brands-carousel" />

          <SliderNav text="Laptop" link={AppRoute.LAPTOPS} />
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
      <div className="main-benefit-container">
        <div className="benefit-area">
          <Benefits />
        </div>
      </div>
    </>
  );
}
