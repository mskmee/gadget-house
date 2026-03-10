import React, { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { DEFAULT_SIZE, DEFAULT_SIZE_MOBILE } from '@/constants/pagination';
import { AppDispatch, RootState } from '@/store';
import { getFilteredProducts, searchProducts } from '@/store/products/actions';
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
import { formatCategoryUrlName } from '@/utils/helpers/formatCategoryUrlName';

import CatalogPageSkeleton from '../skeletons/CatalogPageSkeleton';

const searchColorMap: Record<string, string> = {
  white: 'WHITE',
  black: 'BLACK',
  red: 'RED',
  green: 'GREEN',
  blue: 'BLUE',
  violet: 'VIOLET',
  purple: 'VIOLET',
  grey: 'GREY',
  gray: 'GREY',
  gold: 'GOLD',
  orange: 'ORANGE',
  pink: 'PINK',
};

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
  const { pathname: pathName, state, search } = useLocation();
  const navigate = useNavigate();
  const { searchInputValue, isSuggestion } = state ? state : {};
  const dispatch: AppDispatch = useDispatch();

  const { pagination } = useTypedSelector((state: RootState) => state.products);
  const { selectedCategoryId } = useTypedSelector(
    (state: RootState) => state.filters,
  );
  const {
    selectedSort,
    selectedPriceRange,
    selectedCameraRange,
    selectedAttributes,
  } = useTypedSelector((state: RootState) => state.filters);

  const isMobile991 = useMediaQuery({
    query: '(max-width: 991px)',
  });
  const isMobile767 = useMediaQuery({
    query: '(max-width: 767px)',
  });
  const isInitialLoading =
    useTypedSelector((state: RootState) => state.products.dataStatus) ===
    DataStatus.PENDING;

  const brandIds = useSelector(selectBrandIds);
  const attributesIds = useSelector(selectFilteredAttributes, shallowEqual);

  const selectedColors = useMemo(() => {
    if (!selectedAttributes || selectedAttributes.length === 0) {
      return [];
    }

    const mappedColors = selectedAttributes
      .map((value) => searchColorMap[value.trim().toLowerCase()])
      .filter((value): value is string => Boolean(value));

    return Array.from(new Set(mappedColors));
  }, [selectedAttributes]);

  const size = isMobile767 ? DEFAULT_SIZE_MOBILE : DEFAULT_SIZE;
  const searchQueryFromUrl = useMemo(() => {
    const searchParams = new URLSearchParams(search);
    const text = searchParams.get('text');

    if (!text) {
      return '';
    }

    return decodeURIComponent(text).replace(/-/g, ' ');
  }, [search]);

  const activeSearchQuery = (
    searchInputValue ||
    searchQueryFromUrl ||
    ''
  ).trim();

  const pathname = pathName.slice(1);
  let category = '';

  if (pathname.includes('search') && activeSearchQuery) {
    category = isSuggestion
      ? activeSearchQuery.split('-').join(' ')
      : `Search results for "${activeSearchQuery}"`;
  } else {
    formatCategoryUrlName(pathname);
  }

  const isSearchPage = useMemo(() => {
    return pathname.includes('search');
  }, [pathname]);

  useEffect(() => {
    if (!isSearchPage || !activeSearchQuery) {
      return;
    }

    const nextSearchParams = new URLSearchParams();

    nextSearchParams.set('text', activeSearchQuery.replace(/[\s/]/g, '-'));

    if (selectedSort) {
      nextSearchParams.set('sort', selectedSort);
    }

    if (pagination.currentPage > 0) {
      nextSearchParams.set('page', String(pagination.currentPage));
    }

    if (brandIds.length > 0) {
      nextSearchParams.set('brandIds', brandIds.join(','));
    }

    if (attributesIds.length > 0) {
      nextSearchParams.set('attributeValueIds', attributesIds.join(','));
    }

    if (selectedPriceRange[0] > 0) {
      nextSearchParams.set('minPrice', String(selectedPriceRange[0]));
    }

    if (selectedPriceRange[1] > 0 && selectedPriceRange[1] < 100000) {
      nextSearchParams.set('maxPrice', String(selectedPriceRange[1]));
    }

    if (selectedCameraRange[0] > 0) {
      nextSearchParams.set('minMP', String(selectedCameraRange[0]));
    }

    if (selectedCameraRange[1] > 0) {
      nextSearchParams.set('maxMP', String(selectedCameraRange[1]));
    }

    if (selectedColors.length > 0) {
      nextSearchParams.set('colors', selectedColors.join(','));
    }

    const currentParams = new URLSearchParams(search);
    if (currentParams.toString() === nextSearchParams.toString()) {
      return;
    }

    navigate(
      {
        pathname: pathName,
        search: `?${nextSearchParams.toString()}`,
      },
      { replace: true, state },
    );
  }, [
    activeSearchQuery,
    attributesIds,
    brandIds,
    isSearchPage,
    navigate,
    pagination.currentPage,
    pathName,
    search,
    selectedCameraRange,
    selectedColors,
    selectedPriceRange,
    selectedSort,
    state,
  ]);

  useEffect(() => {
    if (
      !isSearchPage ||
      !activeSearchQuery ||
      !selectedSort ||
      isInitialLoading
    )
      return;

    dispatch(
      searchProducts({
        query: activeSearchQuery,
        page: pagination.currentPage,
        size,
        sort: selectedSort,
        brandIds,
        attributeValueIds: attributesIds,
        minPrice: selectedPriceRange[0],
        maxPrice: selectedPriceRange[1],
        minMP: selectedCameraRange[0],
        maxMP: selectedCameraRange[1],
        colors: selectedColors,
      }),
    );
  }, [
    activeSearchQuery,
    attributesIds,
    brandIds,
    dispatch,
    isInitialLoading,
    isSearchPage,
    pagination.currentPage,
    selectedCameraRange,
    selectedColors,
    selectedPriceRange,
    selectedSort,
    size,
  ]);

  useEffect(() => {
    if (categoryId !== null && categoryId === selectedCategoryId) {
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
    }
  }, [
    dispatch,
    pagination.currentPage,
    brandIds,
    attributesIds,
    selectedCameraRange,
    selectedPriceRange,
    selectedSort,
    categoryId,
    selectedCategoryId,
    size,
  ]);

  return (
    <div className={styles.pageLayout}>
      {!isMobile767 && pathName !== '/search/' && (
        <div className="container">
          <CustomBreadcrumbs />
        </div>
      )}

      <div className="container">
        <div className={styles.pageLayout__header}>
          <div className={styles.pageLayout__wrapper}>
            <h2 className={styles.pageLayout__title}>{category}</h2>

            {isMobile991 ? <Filters /> : <SortingDesk />}
          </div>
        </div>

        <div className={styles.pageLayout__content}>
          {!isMobile991 && <FiltersDesk key={categoryId} />}

          {isInitialLoading && pagination.currentPage === 0 ? (
            <CatalogPageSkeleton />
          ) : products.length > 0 ? (
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
  );
};
