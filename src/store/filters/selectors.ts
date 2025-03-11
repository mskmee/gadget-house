import { createSelector } from '@reduxjs/toolkit';

import { Filters, BrandIDs, Sort, Brand } from '@/enums/enums';
import { RootState } from '@/store';

export const selectAttributes = (state: RootState) => state.filters.selectedAttributes || [];
export const selectBrands = (state: RootState) => state.filters.selectedBrands;
export const selectCategory = (state: RootState) => state.filters.selectedCategoryId;
export const selectPriceRange = (state: RootState) => state.filters.selectedPriceRange;
export const selectCameraRange = (state: RootState) => state.filters.selectedCameraRange;
export const selectSelectedSort = (state: RootState) => state.filters.selectedSort;

export const selectSelectedSortName = createSelector(
  [selectSelectedSort],
  (selectedSort) => {
    const sortEntry = Object.values(Sort).find((s) => s.value === selectedSort);
    return sortEntry && sortEntry.name;
  }
);

export const selectBrandIds = createSelector([selectBrands], (selectedOptions) => {
  return (selectedOptions ?? [])
    .map((brand) => BrandIDs[brand as Brand])
    .filter((id) => id !== undefined);
});

export const selectFilteredAttributes = createSelector([selectAttributes], (selectedOptions) => {

  if (!Array.isArray(selectedOptions)) return [];

  return selectedOptions.reduce<number[]>((ids, value) => {
    Object.values(Filters).forEach(({ attributes }) => {
      if (attributes[value] !== undefined) {
        ids.push(attributes[value]);
      }
    });
    return ids;
  }, []);
});
