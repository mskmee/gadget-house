import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination';
import { AppDispatch, RootState } from '@/store';
import { getByCategory } from '@/store/products/actions';
import { Category } from '@/enums/category';
import { PageLayout } from '@/components/PageLayout/PageLayout';

export default function Kids() {
  const dispatch: AppDispatch = useDispatch();
  const { productsByCategory } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    dispatch(
      getByCategory({
        categoryId: Category.KIDS,
        page: DEFAULT_PAGE,
        size: DEFAULT_SIZE,
      }),
    );
  }, [dispatch]);

  return (
    <PageLayout
      products={productsByCategory?.page || []}
      totalPages={productsByCategory?.totalPages || 0}
    />
  );
}
