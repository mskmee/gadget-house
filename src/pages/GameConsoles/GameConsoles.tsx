import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination';
import { Category } from '@/enums/enums';
import { AppDispatch, RootState } from '@/store';
import { setSelectedCategory } from '@/store/filters/filters_slice';
import { getByCategory } from '@/store/products/actions';
import { PageLayout } from '@/components/PageLayout/PageLayout';

export default function GameConsoles() {
  const dispatch: AppDispatch = useDispatch();
  const { productsData } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(
      getByCategory({
        categoryId: Category.GAME_CONSOLES,
        page: DEFAULT_PAGE,
        size: DEFAULT_SIZE,
      }),
    );
    dispatch(setSelectedCategory(Category.GAME_CONSOLES));
  }, [dispatch]);

  return (
    <PageLayout
      products={productsData?.page || []}
      totalPages={productsData?.totalPages || 0}
      categoryId={Category.GAME_CONSOLES}
    />
  );
}
