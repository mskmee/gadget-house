import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/store';
import { getPaginatedProducts } from '@/store/products/actions';
import { PageLayout } from '@/components/PageLayout/PageLayout';

export default function PhotoVideo() {
  const dispatch: AppDispatch = useDispatch();
  const { productsData } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(getPaginatedProducts({ page: 1, size: 10, sort: ['price'] }));
  }, [dispatch]);

  return (
    <PageLayout
      page={productsData?.page || []}
      totalElements={productsData?.totalElements || 0}
      totalPages={productsData?.totalPages || 0}
      currentPage={productsData?.currentPage || 0}
    />
  );
}
