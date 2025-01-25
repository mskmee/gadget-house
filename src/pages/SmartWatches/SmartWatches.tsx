import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/store';
import { getAllProducts } from '@/store/products/actions';
import { PageLayout } from '@/components/PageLayout/PageLayout';

export default function SmartWatches() {
  const dispatch: AppDispatch = useDispatch();
  const { productsData } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(getAllProducts(0));
  }, [dispatch]);

  return (
    <PageLayout
      products={productsData?.page || []}
      totalElements={productsData?.totalElements || 0}
      totalPages={productsData?.totalPages || 0}
      currentPage={productsData?.currentPage || 0}
    />
  );
}
