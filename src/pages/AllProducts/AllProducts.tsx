import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch, RootState } from '@/store';
import { getAllProducts } from '@/store/products/actions';
import { PageLayout } from '@/components/PageLayout/PageLayout';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination';

export default function AllProducts() {
  const dispatch: AppDispatch = useDispatch();
  const { productsData } = useTypedSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    dispatch(getAllProducts({ page: DEFAULT_PAGE, size: DEFAULT_SIZE }));
  }, [dispatch]);

  return (
    <PageLayout
      products={productsData?.page || []}
      totalPages={productsData?.totalPages || 0}
    />
  );
}
