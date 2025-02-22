import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination';
import { AppDispatch, RootState } from '@/store';
import { getByCategory } from '@/store/products/actions';
import { Category } from '@/enums/category';
import { PageLayout } from '@/components/PageLayout/PageLayout';

export default function PhotoVideo() {
  const dispatch: AppDispatch = useDispatch();
  const { productsData } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(
      getByCategory({
        categoryId: Category.CAMERAS,
        page: DEFAULT_PAGE,
        size: DEFAULT_SIZE,
      }),
    );
  }, [dispatch]);

  return (
    <PageLayout
      products={productsData?.page || []}
      totalPages={productsData?.totalPages || 0}
      categoryId={Category.CAMERAS}
    />
  );
}
