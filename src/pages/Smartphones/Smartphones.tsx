import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination';
import { Category } from '@/enums/enums';
import { AppDispatch, RootState } from '@/store';
import { getByCategory } from '@/store/products/actions';
import { setSelectedCategory } from '@/store/filters/filters_slice';
import { PageLayout } from '@/components/PageLayout/PageLayout';

export default function Smartphones() {
  const dispatch: AppDispatch = useDispatch();
  const { productsData } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(
      getByCategory({
        categoryId: Category.PHONES,
        page: DEFAULT_PAGE,
        size: DEFAULT_SIZE,
      }),
    );
    dispatch(setSelectedCategory(Category.PHONES));
  }, [dispatch]);

  return (
    <PageLayout
      products={productsData?.page || []}
      totalPages={productsData?.totalPages || 0}
      categoryId={Category.PHONES}
    />
  );
}
