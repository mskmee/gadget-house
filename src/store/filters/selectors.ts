import { createSelector } from '@reduxjs/toolkit';

import { Filters, BrandIDs, Sort, Brand } from '@/enums/enums';
import { RootState } from '@/store';
import {
  resolveAttributeValueIdsByAttributeNameBackendFirst,
  resolveBrandIdsBackendFirst,
} from '@/utils/helpers/filters-search-kit';

const EMPTY_STRING_ARRAY: string[] = [];

export const selectAttributes = (state: RootState) =>
  state.filters.selectedAttributes ?? EMPTY_STRING_ARRAY;
export const selectBrands = (state: RootState) =>
  state.filters.selectedBrands ?? EMPTY_STRING_ARRAY;
export const selectCategory = (state: RootState) =>
  state.filters.selectedCategoryId;
export const selectPriceRange = (state: RootState) =>
  state.filters.selectedPriceRange;
export const selectCameraRange = (state: RootState) =>
  state.filters.selectedCameraRange;
export const selectSelectedSort = (state: RootState) =>
  state.filters.selectedSort;
export const selectAllAttributes = (state: RootState) =>
  state.filters.allAttributes;
export const selectAllBrands = (state: RootState) => state.filters.allBrands;

export const selectSelectedSortName = createSelector(
  [selectSelectedSort],
  (selectedSort) => {
    const sortEntry = Object.values(Sort).find((s) => s.value === selectedSort);
    return sortEntry && sortEntry.name;
  },
);

export const selectBrandIds = createSelector(
  [selectBrands, selectAllBrands],
  (selectedOptions, allBrands) => {
    const legacyBrandMap = Object.fromEntries(
      Object.values(Brand)
        .map((brandName) => [brandName, BrandIDs[brandName as Brand]])
        .filter(([, id]) => id !== undefined),
    ) as Record<string, number>;

    return resolveBrandIdsBackendFirst(
      selectedOptions,
      allBrands,
      legacyBrandMap,
    );
  },
);

export const selectFilteredAttributes = createSelector(
  [selectAttributes, selectAllAttributes],
  (selectedOptions, allAttributes) => {
    return resolveAttributeValueIdsByAttributeNameBackendFirst(
      selectedOptions,
      allAttributes,
      'Built-in memory',
      ['builtInMemory', 'ROM memory', 'Built in memory'],
      Filters.ROM_MEMORY.attributes,
    );
  },
);
