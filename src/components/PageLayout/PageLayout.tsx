import React from 'react';
import { Skeleton } from 'antd';

import { IProductCard } from '@/interfaces/interfaces';
import { FiltersDesk } from '@/components/Filters/FiltersDesk';
import { Filters } from '@/components/Filters/Filters';
import { SortingDesk } from '@/components/Sort/SortingDesk';
import { Catalog } from '@/components/Catalog/Catalog';

import styles from './page-layout.module.scss';

interface IPageLayoutProps {
  title: string;
  data: IProductCard[];
  isLoading?: boolean;
}

export const PageLayout: React.FC<IPageLayoutProps> = ({
  title,
  data,
  isLoading,
}) => {
  return (
    <div className={styles.pageLayout}>
      <div className={styles.pageLayout_mobile}>
        <div className={`container ${styles.pageLayout__container}`}>
          <div className={styles.pageLayout__wrapper}>
            <h2 className={styles.pageLayout__title}>{title}</h2>
          </div>

          <Filters />

          <Catalog products={data} />
        </div>
      </div>

      <div className={styles.pageLayout_tablet}>
        <div className={`container ${styles.pageLayout__container}`}>
          <div className={styles.pageLayout__wrapper}>
            <h2 className={styles.pageLayout__title}>{title}</h2>
            <Filters />
          </div>

          <Catalog products={data} />
        </div>
      </div>

      <div className={styles.pageLayout_desk}>
        <div className={styles.pageLayout__header}>
          <div className={`container ${styles.pageLayout__container}`}>
            <div className={styles.pageLayout__wrapper}>
              <h2 className={styles.pageLayout__title}>{title}</h2>
              <SortingDesk />
            </div>

            <div className={styles.pageLayout__content}>
              {isLoading ? (
                <Skeleton active title={false} paragraph={{ rows: 6 }} />
              ) : (
                <FiltersDesk />
              )}
              {data.length !== 0 ? (
                isLoading ? (
                  <Skeleton active title={false} paragraph={{ rows: 18 }} />
                ) : (
                  <Catalog products={data} />
                )
              ) : (
                <div>Products not found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
