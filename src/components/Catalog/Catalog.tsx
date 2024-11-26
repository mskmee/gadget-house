import { FC, useEffect, useRef, useState } from 'react';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

import { IProductCard } from '@/interfaces/interfaces';
import { MyCard } from '../components';

import styles from './catalog.module.scss';

interface CatalogProps {
  products: IProductCard[];
}

export const Catalog: FC<CatalogProps> = ({ products }) => {
  const [displayedProducts, setDisplayedProducts] = useState<IProductCard[]>(
    [],
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const itemsPerPage = 18;
  const itemsPerPageMobile = 8;

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setDisplayedProducts(products.slice(0, itemsPerPageMobile));
  }, [products]);

  const loadMore = () => {
    const currentLength = displayedProducts.length;
    const nextProducts = products.slice(
      currentLength,
      currentLength + itemsPerPageMobile,
    );

    if (nextProducts.length === 0) {
      setHasMore(false);
      return;
    }

    setDisplayedProducts((prev) => [...prev, ...nextProducts]);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: '10px',
        threshold: 1.0,
      },
    );

    const currentObserverRef = observerRef.current;

    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [displayedProducts, hasMore]);

  return (
    <div className={styles.catalog}>
      <div className={styles.catalog__mobile}>
        <ul className={styles.catalog__mobileList}>
          {Array.isArray(products) &&
            displayedProducts.map((product: IProductCard) => (
              <MyCard
                key={product.id}
                product={product}
                classname="catalog__item"
                index={product.id}
              />
            ))}
        </ul>

        {hasMore && (
          <div ref={observerRef} className={styles.catalog__loadingIndicator}>
            Loading more products...
          </div>
        )}
      </div>

      <div className={styles.catalog__desk}>
        <ul className={styles.catalog__deskList}>
          {Array.isArray(products) &&
            paginatedProducts.map((product: IProductCard) => (
              <MyCard
                key={product.id}
                product={product}
                classname="catalog__item"
              />
            ))}
        </ul>

        <Pagination
          showSizeChanger={false}
          showTitle={false}
          current={currentPage}
          total={products.length}
          onChange={onChange}
          pageSize={itemsPerPage}
          className={styles.catalog__pagination}
        />
      </div>
    </div>
  );
};
