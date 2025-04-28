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
  const { pagination } = useTypedSelector(
    (state: RootState) => state.products,
  );
  const [hasMore, setHasMore] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    if (pagination.totalPages) {
      setHasMore(pagination.currentPage < pagination.totalPages - 1);
    }
  }, [pagination]);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const isMobile680px = useMediaQuery({
    query: '(max-width: 680px)',
  });
  // console.log('isMobile680px', isMobile680px)

  // useEffect(() => {

  //     // console.log('1')

    
  //     const size = DEFAULT_SIZE;

  //     dispatch(
  //       getPaginatedProducts({
  //         categoryId: categoryId || 0,
  //         page: pagination.currentPage,
  //         size: size,
  //         append: false
  //       }),
  //     ).then((res) => {
  //       if (!res.payload || (res.payload as IProductCard[]).length === 0) {
  //         setHasMore(false);
  //       }
  //     });
  
    
  // }, [categoryId, pagination.currentPage, isMobile680px]);

  // const loadMore = () => {
  //   if (hasMore) {
  //     dispatch(setPageNumber(pagination.currentPage + 1));
  //   }
  // };

  useEffect(() => {
    if (!isMobile680px) return;
    console.log('2')
    console.log('3', hasMore)
    const size = DEFAULT_SIZE_MOBILE

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          console.log('asd')
          //  dispatch(
          //     getPaginatedProducts({
          //       categoryId: categoryId || 0,
          //       page: pagination.currentPage + 1,
          //       size: 1,
          //       append: true
          //     }),
          //   )
          // setIsFetching(true);
          // dispatch(setPageNumber(pagination.currentPage + 1));
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
  }, [hasMore, isMobile680px, isFetching, pagination.currentPage]);


  return (
    <div className={styles.catalog}>
      {isMobile680px ? (
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
        )
      }

      
    </div>
  );
};
