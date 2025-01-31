import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch, RootState } from '@/store';
import { getAllProducts } from '@/store/products/actions';
import { PageLayout } from '@/components/PageLayout/PageLayout';
import { useTypedSelector } from '@/hooks/useTypedSelector';

export default function AllProducts() {
  const dispatch: AppDispatch = useDispatch();
  const { productsData, pageNumber } = useTypedSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    dispatch(getAllProducts(pageNumber));
  }, [dispatch]);

  return (
    <PageLayout
      products={productsData?.page || []}
      totalElements={productsData?.totalElements || 0}
      totalPages={productsData?.totalPages || 1}
      currentPage={pageNumber || 0}
    />
  );
}
