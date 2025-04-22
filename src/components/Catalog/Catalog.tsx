import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Pagination } from 'antd';

import { DEFAULT_SIZE, DEFAULT_SIZE_MOBILE } from '@/constants/pagination';
import { useMediaQuery } from 'react-responsive';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { IProductCard } from '@/interfaces/interfaces';
import { AppDispatch, RootState } from '@/store';
import { getPaginatedProducts } from '@/store/products/actions';
import { setPageNumber } from '@/store/products/products_slice';
import { MyCard } from '../components';

import styles from './catalog.module.scss';

interface ICatalogProps {
  data: IProductCard[];
  totalPages: number;
  categoryId?: number | null;
}

export const Catalog: FC<ICatalogProps> = ({
  data,
  totalPages,
  categoryId,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { pagination, productsData } = useTypedSelector(
    (state: RootState) => state.products,
  );
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const isMobile680px = useMediaQuery({
    query: '(max-width: 680px)',
  });

  useEffect(() => {
    const size = isMobile680px ? DEFAULT_SIZE_MOBILE : DEFAULT_SIZE;

    dispatch(
      getPaginatedProducts({
        categoryId: categoryId || 0,
        page: pagination.currentPage,
        size: size,
      }),
    ).then((res) => {
      if (!res.payload || (res.payload as IProductCard[]).length === 0) {
        setHasMore(false);
      }
    });
  }, [categoryId, pagination.currentPage]);

  const loadMore = () => {
    if (hasMore) {
      dispatch(setPageNumber(pagination.currentPage + 1));
    }
  };

  useEffect(() => {
    if (!isMobile680px) return;

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

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore]);

  return (
    <div className={styles.catalog}>
      {isMobile680px && (
        <div className={styles.catalog__mobile}>
          <ul className={styles.catalog__mobileList}>
            {productsData?.page.map((product: IProductCard) => (
              <MyCard
                key={product.id}
                tempProduct={product}
                classname={styles.catalog__item}
                index={product.id}
                width={0}
              />
            ))}
          </ul>

          {hasMore && (
            <div ref={observerRef} className={styles.catalog__loadingIndicator}>
              Loading more products...
            </div>
          )}
        </div>
      )}

      <div className={styles.catalog__desk}>
        <ul className={styles.catalog__deskList}>
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
        </ul>

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
    </div>
  );
};
