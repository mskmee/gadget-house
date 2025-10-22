import { RootState } from '@/store';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { PageLayout } from '@/components/PageLayout/PageLayout';

export default function SearchResultsFound() {
  const { searchResults } = useTypedSelector(
    (state: RootState) => state.products,
  );

  return (
    <PageLayout
      products={searchResults?.page || []}
      totalPages={searchResults?.totalPages || 0}
    />
  );
}
