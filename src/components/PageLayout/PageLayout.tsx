import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { DEFAULT_SIZE } from '@/constants/pagination';
import { AppDispatch, RootState } from '@/store';
import { getFilteredProducts } from '@/store/products/actions';
import {
  selectBrandIds,
  selectFilteredAttributes,
} from '@/store/filters/selectors';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { IProductCard } from '@/interfaces/interfaces';
import { FiltersDesk } from '@/components/Filters/FiltersDesk';
import { Filters } from '@/components/Filters/Filters';
import { SortingDesk } from '@/components/Sort/SortingDesk';
import { Catalog } from '@/components/Catalog/Catalog';
import { CustomBreadcrumbs } from '../SingleProduct/CustomBreadcrumbs';

import styles from './page-layout.module.scss';

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
    selectedCategoryId,
    selectedPriceRange,
    selectedCameraRange,
  } = useTypedSelector((state: RootState) => state.filters);
  const brandIds = useSelector(selectBrandIds);
  const attributesIds = useSelector(selectFilteredAttributes, shallowEqual);

  useEffect(() => {
    dispatch(
      getFilteredProducts({
        page: pagination.currentPage,
        size: DEFAULT_SIZE,
        categoryId: selectedCategoryId ?? null,
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
    selectedCategoryId,
    brandIds,
    attributesIds,
    selectedCameraRange,
    selectedPriceRange,
    selectedSort,
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

  return (
    <div className={styles.pageLayout}>
      <div className={styles.pageLayout_mobile}>
        <div className={`container ${styles.pageLayout__container}`}>
          <div className={styles.pageLayout__wrapper}>
            <h2 className={styles.pageLayout__title}>{category}</h2>
          </div>

          <Filters />

          {products.length > 0 ? (
            <Catalog
              data={products}
              totalPages={totalPages}
              categoryId={categoryId}
            />
          ) : (
            <div>Products not found</div>
          )}
        </div>
      </div>

      <div className={styles.pageLayout_tablet}>
        <div className="container">
          <div className={styles.pageLayout__container}>
            <CustomBreadcrumbs />
            <div className={styles.pageLayout__wrapper}>
              <h2 className={styles.pageLayout__title}>{category}</h2>
              <Filters />
            </div>

            {products.length > 0 ? (
              <Catalog
                data={products}
                totalPages={totalPages}
                categoryId={categoryId}
              />
            ) : (
              <div>Products not found</div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.pageLayout_desk}>
        {pathName !== '/search/' && (
          <div className="container">
            <CustomBreadcrumbs />
          </div>
        )}

        <div className={styles.pageLayout__header}>
          <div className="container">
            <div className={styles.pageLayout__wrapper}>
              <h2 className={styles.pageLayout__title}>{category}</h2>
              <SortingDesk />
            </div>
          </div>
        </div>

        <div className="container">
          <div className={styles.pageLayout__content}>
            <FiltersDesk />

            {products.length > 0 ? (
              <Catalog
                data={products}
                totalPages={totalPages}
                categoryId={categoryId}
              />
            ) : (
              <div>Products not found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
