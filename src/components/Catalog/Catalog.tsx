import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

import { DEFAULT_SIZE, DEFAULT_SIZE_MOBILE } from '@/constants/pagination';
import { AppDispatch, RootState } from '@/store';
import { setPageNumber } from '@/store/products/products_slice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { ProductItem } from '@/utils/packages/products';
import { Card } from './Card';

import styles from './catalog.module.scss';
import { getPaginatedProducts } from '@/store/products/actions';

interface ICatalogProps {
  data: ProductItem[];
  totalPages: number;
}

export const Catalog: FC<ICatalogProps> = ({ data, totalPages }) => {
  const dispatch: AppDispatch = useDispatch();
  const [, setDisplayedProducts] = useState<ProductItem[]>([]);
  const { pagination } = useTypedSelector((state: RootState) => state.products);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(
      getPaginatedProducts({
        page: pagination.currentPage,
        size: DEFAULT_SIZE,
      }),
    );
    setDisplayedProducts(data.slice(0, DEFAULT_SIZE_MOBILE));
  }, [pagination.currentPage]);

  const onChange: PaginationProps['onChange'] = (page) => {
    dispatch(setPageNumber(page - 1));
  };

  const loadMore = () => {
    const currentLength = data.length;
    const nextProducts = data.slice(
      currentLength,
      currentLength + DEFAULT_SIZE_MOBILE,
    );

    if (nextProducts.length === 0) {
      setHasMore(false);
      return;
    }

    setDisplayedProducts((prev) => {
      const currentLength = prev.length;
      const nextProducts = data.slice(
        currentLength,
        currentLength + DEFAULT_SIZE_MOBILE,
      );

      if (nextProducts.length === 0) {
        setHasMore(false);
        return prev;
      }

      return [...prev, ...nextProducts];
    });
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
  }, [hasMore]);

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
          current={pagination.currentPage + 1}
          pageSize={DEFAULT_SIZE}
          total={totalPages * DEFAULT_SIZE}
          onChange={onChange}
          className={styles.catalog__pagination}
        />
      </div>
    </div>
  );
};
