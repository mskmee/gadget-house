import { FC, useEffect, useRef, useState } from 'react';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

import { ProductItem } from '@/utils/packages/products';
import { Card } from './Card';

import styles from './catalog.module.scss';

interface ICatalogProps {
  data: ProductItem[];
  totalElements: number;
  totalPages: number;
  page: number;
}

export const Catalog: FC<ICatalogProps> = ({
  data,
  totalPages,
  totalElements,
  page,
}) => {
  const [, setDisplayedProducts] = useState<ProductItem[]>([]);
  const [currentPage, setCurrentPage] = useState(page);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const itemsPerPageMobile = 8;

  // const paginatedProducts = data.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage,
  // );

  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setDisplayedProducts(data.slice(0, itemsPerPageMobile));
  }, [data]);

  const loadMore = () => {
    const currentLength = data.length;
    const nextProducts = data.slice(
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
  }, [data, hasMore]);

  return (
    <div className={styles.catalog}>
      <div className={styles.catalog__mobile}>
        <ul className={styles.catalog__mobileList}>
          {data &&
            data.map((product: ProductItem) => (
              <Card
                key={product.id}
                product={product}
                classname={styles.catalog__item}
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
          {data &&
            data.map((product: ProductItem) => (
              <Card
                key={product.id}
                product={product}
                classname="catalog__item"
              />
            ))}
        </ul>

        <Pagination
          showSizeChanger={false}
          showTitle={false}
          // defaultCurrent={page}
          current={currentPage}
          total={totalPages * totalElements}
          onChange={onChange}
          // pageSize={itemsPerPage}
          className={styles.catalog__pagination}
        />
      </div>
    </div>
  );
};
