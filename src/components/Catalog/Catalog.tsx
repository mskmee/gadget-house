import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

import { RootState } from '@/store';
import { setPageNumber } from '@/store/products/products_slice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { ProductItem } from '@/utils/packages/products';
import { Card } from './Card';

import styles from './catalog.module.scss';

interface ICatalogProps {
  data: ProductItem[];
  totalElements: number;
  totalPages: number;
  page?: number;
}

export const Catalog: FC<ICatalogProps> = ({
  data,
  totalPages,
  totalElements,
}) => {
  const dispatch = useDispatch();
  const [, setDisplayedProducts] = useState<ProductItem[]>([]);
  const { pageNumber } = useTypedSelector((state: RootState) => state.products);
  console.log('pageNumber: ', pageNumber);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const itemsPerPageMobile = 8;

  // const paginatedProducts = data.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage,
  // );

  const onChange: PaginationProps['onChange'] = (page) => {
    dispatch(setPageNumber(page - 1));
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
          current={pageNumber}
          // total={18}
          total={totalPages * totalElements}
          onChange={onChange}
          className={styles.catalog__pagination}
        />
      </div>
    </div>
  );
};
