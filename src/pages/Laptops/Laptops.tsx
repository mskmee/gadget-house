import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Category } from '@/enums/enums';
import { AppDispatch, RootState } from '@/store';
import { setSelectedCategory } from '@/store/filters/filters_slice';
import { PageLayout } from '@/components/PageLayout/PageLayout';

export default function Laptops() {
  const dispatch: AppDispatch = useDispatch();
  const { productsData } = useSelector((state: RootState) => state.products);
  useEffect(() => {
    dispatch(setSelectedCategory(Category.LAPTOPS));
  }, [dispatch]);

  return (
    <PageLayout
      products={productsData?.page || []}
      totalPages={productsData?.totalPages || 0}
      categoryId={Category.LAPTOPS}
    />
  );
}
