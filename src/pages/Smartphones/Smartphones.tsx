import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/store';
import { getCategoryProducts } from '@/store/products/actions';
import { PageLayout } from '@/components/PageLayout/PageLayout';
import { Category } from '@/enums/category';

export default function Smartphones() {
  const dispatch: AppDispatch = useDispatch();
  const { productsData } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(
      getCategoryProducts({
        name: 'smartphones',
        categoryId: Category.PHONES,
        price: { from: 0, to: 100000 },
        brandIds: [1, 2],
        attributeValueIds: [],
      }),
    );
  }, [dispatch]);

  return (
    <PageLayout
      page={productsData?.page || []}
      totalElements={productsData?.totalElements || 0}
      totalPages={productsData?.totalPages || 0}
      currentPage={productsData?.currentPage || 0}
    />
  );
}
