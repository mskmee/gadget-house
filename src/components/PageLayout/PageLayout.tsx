import React from 'react';
import { useLocation } from 'react-router-dom';

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
