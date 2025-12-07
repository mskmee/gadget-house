import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/PageLayout/PageLayout';
import items from '@/components/BurgerMenu/constants';
import { useActions } from '@/hooks/useActions';
import { AppDispatch, RootState } from '@/store';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { resetFilters } from '@/store/filters/filters_slice';
import { setIsAppending, setPageNumber } from '@/store/products/products_slice';
import { Category as CategoryENUM } from '@/enums/enums';
import { AppRoute } from '@/enums/Route';
import { DataStatus } from '@/enums/data-status';

function Category() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { category } = useParams();

  const { productsData, dataStatus } = useTypedSelector(
    (state: RootState) => state.products,
  );

  const { selectedCategoryId } = useTypedSelector(
    (state: RootState) => state.filters,
  );

  const categoryName = items.find(
    (item) => item.link === `/${category}`,
  )?.title;

  const categoryKey = category
    ?.replace(/-/g, '_')
    .toUpperCase() as keyof typeof CategoryENUM;
  const categoryId = CategoryENUM[categoryKey];

  const isValidCategory = categoryId !== undefined;
  const isDataLoaded = dataStatus === DataStatus.FULFILLED;

  const { setSelectedCategory } = useActions();

  useEffect(() => {
    if (isValidCategory && categoryId !== selectedCategoryId) {
      dispatch(setPageNumber(0));
      dispatch(setIsAppending(false));
      dispatch(resetFilters());
      setSelectedCategory(categoryId);
    }
  }, [
    setSelectedCategory,
    categoryId,
    dispatch,
    isValidCategory,
    selectedCategoryId,
  ]);

  useEffect(() => {
    if (isDataLoaded && productsData?.page?.length === 0 && isValidCategory) {
      navigate(AppRoute.CATEGORY_EMPTY, {
        state: { categoryName },
        replace: true,
      });
    }
  }, [isDataLoaded, productsData, isValidCategory, navigate, categoryName]);

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
