import { PageLayout } from '@/components/PageLayout/PageLayout';
import { AppDispatch, RootState } from '@/store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Category as CatogoryENUM } from '@/enums/enums';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import { useDispatch } from 'react-redux';
import { resetFilters } from '@/store/filters/filters_slice';
import { setPageNumber } from '@/store/products/products_slice';

function Category() {
  const { productsData } = useTypedSelector(
    (state: RootState) => state.products,
  );

  const { category } = useParams();
  const categoryKey = category
    ?.replace(/-/g, '_')
    .toUpperCase() as keyof typeof CatogoryENUM;
  const categoryId = CatogoryENUM[categoryKey];

  const isValidCategory = categoryId !== undefined;

  const { setSelectedCategory } = useActions();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (isValidCategory) {
      dispatch(setPageNumber(0));
      dispatch(resetFilters());
      setSelectedCategory(categoryId);
    }
  }, [setSelectedCategory, categoryId, dispatch, isValidCategory]);

  if (!isValidCategory) {
    return <div>Invalid category</div>;
  }

  return (
    <PageLayout
      products={productsData?.page || []}
      totalPages={productsData?.totalPages || 0}
      categoryId={categoryId}
    />
  );
}

export default Category;
