import { PageLayout } from '@/components/PageLayout/PageLayout';
import { AppDispatch, RootState } from '@/store';
import { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Category as CategoryENUM } from '@/enums/enums';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import { useDispatch } from 'react-redux';
import { resetFilters } from '@/store/filters/filters_slice';
import { setIsAppending, setPageNumber } from '@/store/products/products_slice';
import { AppRoute } from '@/enums/Route';
import { DataStatus } from '@/enums/data-status';
import { formatCategoryUrlName } from '@/utils/helpers/formatCategoryUrlName';

function Category() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { category } = useParams();

  const { productsData, dataStatus } = useTypedSelector(
    (state: RootState) => state.products,
  );

  const categoryKey = category
    ?.replace(/-/g, '_')
    .toUpperCase() as keyof typeof CategoryENUM;
  const categoryId = CategoryENUM[categoryKey];

  const isValidCategory = categoryId !== undefined;
  const isDataLoaded = dataStatus === DataStatus.FULFILLED;

  const { setSelectedCategory } = useActions();

  const categoryName = useMemo(
    () => formatCategoryUrlName(category),
    [category],
  );

  useEffect(() => {
    if (isValidCategory) {
      dispatch(setPageNumber(0));
      dispatch(setIsAppending(false));
      dispatch(resetFilters());
      setSelectedCategory(categoryId);
    }
  }, [setSelectedCategory, categoryId, dispatch, isValidCategory]);

  useEffect(() => {
    if (isDataLoaded && productsData?.page?.length === 0 && isValidCategory) {
      navigate(AppRoute.CATEGORY_EMPTY, {
        state: { categoryName },
        replace: true,
      });
    }
  }, [isDataLoaded, productsData, isValidCategory, categoryName, navigate]);

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
