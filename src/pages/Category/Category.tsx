import { PageLayout } from '@/components/PageLayout/PageLayout';
import { AppDispatch, RootState } from '@/store';
import { setSelectedCategory } from '@/store/filters/filters_slice';
import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Category as CatogoryENUM } from '@/enums/enums';

function Category() {

  const dispatch: AppDispatch = useDispatch();
  const { productsData } = useSelector((state: RootState) => state.products);

  const {category} = useParams();
  const categoryKey = category?.replace(/-/g, '_').toUpperCase() as keyof typeof CatogoryENUM;
  const categoryId = CatogoryENUM[categoryKey]

  const isValidCategory = categoryId !== undefined;

  useEffect(() => {
    dispatch(setSelectedCategory(categoryId));
  }, [dispatch, categoryId]);

  if(!isValidCategory) {
    return <div>Invalid category</div>
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