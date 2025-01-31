import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/store';
import { getByCategory, getByCategoryProducts } from '@/store/products/actions';
import { PageLayout } from '@/components/PageLayout/PageLayout';
import { Category } from '@/enums/category';

export default function Smartphones() {
  const dispatch: AppDispatch = useDispatch();
  const { productsByCategory, categoryProducts } = useSelector(
    (state: RootState) => state.products,
  );
  console.log('categoryProducts: ', categoryProducts);

  useEffect(() => {
    dispatch(getByCategory(Category.CAMERAS));
    dispatch(
      getByCategoryProducts({ categoryId: Category.LAPTOPS, brandIds: [1] }),
    );
  }, [dispatch]);

  return (
    <PageLayout
      products={productsByCategory?.page || []}
      totalElements={productsByCategory?.totalElements || 0}
      totalPages={productsByCategory?.totalPages || 0}
      currentPage={productsByCategory?.currentPage || 0}
    />
  );
}
