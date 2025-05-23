import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { DEFAULT_SIZE, DEFAULT_SIZE_MOBILE } from '@/constants/pagination';
import { AppDispatch, RootState } from '@/store';
import { getFilteredProducts } from '@/store/products/actions';
import {
  selectBrandIds,
  selectFilteredAttributes,
} from '@/store/filters/selectors';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { IProductCard } from '@/interfaces/interfaces';
import { FiltersDesk } from '@/components/Filters/FiltersDesk';
import { Catalog } from '@/components/Catalog/Catalog';
import { CustomBreadcrumbs } from '../SingleProduct/CustomBreadcrumbs';

import styles from './page-layout.module.scss';
import { useMediaQuery } from 'react-responsive';

import { Filters } from '../Filters/Filters';
import { SortingDesk } from '../Sort/SortingDesk';
import { DataStatus } from '@/enums/data-status';

interface IPageLayoutProps {
  products: IProductCard[];
  totalPages: number;
  categoryId?: number | null;
}

export const PageLayout: React.FC<IPageLayoutProps> = ({
  products,
  totalPages,
  categoryId,
}) => {
  const { pathname: pathName, state } = useLocation();
  const { searchInputValue, isSuggestion } = state ? state : {};
  const dispatch: AppDispatch = useDispatch();

  const { pagination } = useTypedSelector((state: RootState) => state.products);
  const {
    selectedSort,
    selectedPriceRange,
    selectedCameraRange,
  } = useTypedSelector((state: RootState) => state.filters);


  const isMobile991 = useMediaQuery({
    query: '(max-width: 991px)',
  });
  const isMobile767 = useMediaQuery({
    query: '(max-width: 767px)',
  });

  const brandIds = useSelector(selectBrandIds);
  const attributesIds = useSelector(selectFilteredAttributes, shallowEqual);

  const size = isMobile767 ? DEFAULT_SIZE_MOBILE : DEFAULT_SIZE;

  useEffect(() => {
    dispatch(
      getFilteredProducts({
        page: pagination.currentPage,
        size: size,
        categoryId: categoryId,
        brandIds: brandIds,
        attributes: attributesIds,
        minPrice: selectedPriceRange[0],
        maxPrice: selectedPriceRange[1],
        minCameraMP: selectedCameraRange[0],
        maxCameraMP: selectedCameraRange[1],
        sort: selectedSort as string,
      }),
    );
  }, [
    dispatch,
    pagination.currentPage,
    brandIds,
    attributesIds,
    selectedCameraRange,
    selectedPriceRange,
    selectedSort,
    categoryId
  ]);


  const pathname = pathName.slice(1);
  let category = '';

  if (pathname.includes('search') && searchInputValue) {
    category = isSuggestion
      ? searchInputValue.split('-').join(' ')
      : `Search results for "${searchInputValue}"`;
  } else {
    pathname.includes('-')
      ? (category =
          pathname.charAt(0).toUpperCase() +
          pathname.slice(1).split('-').join(' '))
      : (category = pathname.charAt(0).toUpperCase() + pathname.slice(1));
  }

  const isInitialLoading =
  useTypedSelector((state: RootState) => state.products.dataStatus) ===
  DataStatus.PENDING;


  return (
    <div className={styles.pageLayout}>
      {!isMobile767 && pathName !== '/search/' && (
        <div className="container">
          <CustomBreadcrumbs />
        </div>
      )}

      <div className='container'>

        <div className={styles.pageLayout__header}>
          <div className={styles.pageLayout__wrapper}>
            <h2 className={styles.pageLayout__title}>{category}</h2>

            {isMobile991 ? <Filters/> : <SortingDesk /> }
          </div>
        </div>

        <div className={styles.pageLayout__content}>
          {!isMobile991 && <FiltersDesk /> }
          
          {
            isInitialLoading && pagination.currentPage === 0 
            ? 'Loading...'
            : products.length > 0 ? (
              <Catalog
                data={products}
                totalPages={totalPages}
                categoryId={categoryId}
              />
            ) : (
              <div>Products not found</div>
            )
          }
        </div>
      </div>
    </div>
  )
};
