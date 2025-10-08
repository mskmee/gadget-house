import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Pagination } from 'antd';

import { DEFAULT_SIZE } from '@/constants/pagination';
import { useMediaQuery } from 'react-responsive';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { IProductCard } from '@/interfaces/interfaces';
import { AppDispatch, RootState } from '@/store';
import { setIsAppending, setPageNumber } from '@/store/products/products_slice';
import { MyCard } from '../components';

import styles from './catalog.module.scss';

interface ICatalogProps {
  data: IProductCard[];
  totalPages: number;
  categoryId?: number | null;
}

export const Catalog: FC<ICatalogProps> = ({ data, totalPages }) => {
  const [hasMore, setHasMore] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { pagination } = useTypedSelector((state: RootState) => state.products);
  const [prevPage, setPrevPage] = useState<number | null>(null);
  const isFetchingMore = useTypedSelector(
    (state: RootState) => state.products.isFetchingMore,
  );
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }, []);

  useEffect(() => {
    if (pagination.totalPages) {
      setHasMore(pagination.currentPage < pagination.totalPages - 1);
    }
  }, [pagination]);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const isMobile767 = useMediaQuery({
    query: '(max-width: 767px)',
  });

  useEffect(() => {
    if (!isMobile767 || !observerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isFetchingMore) {
          dispatch(setIsAppending(true));
          dispatch(setPageNumber(pagination.currentPage + 1));
        }
      },
      {
        rootMargin: '50px',
        threshold: 1,
      },
    );

    const target = observerRef.current;
    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [hasMore, isMobile767, pagination.currentPage, isFetchingMore, dispatch]);

  useEffect(() => {
    if (
      prevPage !== null &&
      pagination.currentPage !== prevPage &&
      !isMobile767
    ) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    setPrevPage(pagination.currentPage);
  }, [pagination.currentPage, prevPage, isMobile767]);

  return (
    <div className={styles.catalog}>
      {isMobile767 ? (
        <div className={styles.catalog__mobile}>
          <div className={styles.catalog__mobileList}>
            {data.map((product: IProductCard) => (
              <MyCard
                key={product.id}
                tempProduct={product}
                classname={styles.catalog__item}
                index={product.id}
                width={0}
              />
            ))}
          </div>

          {hasMore && (
            <div ref={observerRef} className={styles.catalog__loadingIndicator}>
              Loading more products...
            </div>
          )}
        </div>
      ) : (
        <div className={styles.catalog__desk}>
          <div className={styles.catalog__deskList}>
            {data &&
              data.map((product: IProductCard) => (
                <MyCard
                  key={product.id}
                  tempProduct={product}
                  classname={styles.catalog__item}
                  index={product.id}
                  width={0}
                />
              ))}
          </div>

          <Pagination
            showSizeChanger={false}
            showTitle={false}
            current={pagination.currentPage + 1}
            pageSize={DEFAULT_SIZE}
            total={totalPages * DEFAULT_SIZE}
            onChange={(page) => dispatch(setPageNumber(page - 1))}
            className={styles.catalog__pagination}
          />
        </div>
      )}
    </div>
  );
};
