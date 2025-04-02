import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination';
import { Category } from '@/enums/enums';
import { AppDispatch, RootState } from '@/store';
import { getAllProducts } from '@/store/products/actions';
import { setSelectedCategory } from '@/store/filters/filters_slice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { PageLayout } from '@/components/PageLayout/PageLayout';

export default function AllProducts() {
  const dispatch: AppDispatch = useDispatch();
  const { productsData } = useTypedSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    dispatch(getAllProducts({ page: DEFAULT_PAGE, size: DEFAULT_SIZE }));

    dispatch(setSelectedCategory(Category.EMPTY));
  }, [dispatch]);

  return (
    <PageLayout
      products={productsData?.page || []}
      totalPages={productsData?.totalPages || 0}
    />
  );
}
