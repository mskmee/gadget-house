import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/store';
import { getByCategoryProducts } from '@/store/products/actions';
import { PageLayout } from '@/components/PageLayout/PageLayout';
import { Category } from '@/enums/category';

export default function Smartphones() {
  const dispatch: AppDispatch = useDispatch();
  const { categoryProducts } = useSelector(
    (state: RootState) => state.products,
  );
  console.log('categoryProducts: ', categoryProducts);

  useEffect(() => {
    dispatch(getByCategoryProducts({ categoryId: Category.CAMERAS }));
  }, [dispatch]);

  return (
    <PageLayout
      products={categoryProducts?.page || []}
      totalElements={categoryProducts?.totalElements || 0}
      totalPages={categoryProducts?.totalPages || 0}
      currentPage={categoryProducts?.currentPage || 0}
    />
  );
}
