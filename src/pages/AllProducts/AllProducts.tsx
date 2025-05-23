import { RootState } from '@/store';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { PageLayout } from '@/components/PageLayout/PageLayout';

export default function AllProducts() {
  const { productsData } = useTypedSelector(
    (state: RootState) => state.products,
  );

  return (
    <PageLayout
      products={productsData?.page || []}
      totalPages={productsData?.totalPages || 0}
    />
  );
}
