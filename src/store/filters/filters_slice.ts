import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus, Sort } from '@/enums/enums';
import { getAllAttributes, getAllBrands, getAllCategories } from './actions';
import {
  BrandsResponseDto,
  CategoriesResponseDto,
  AttributesResponseDto,
} from '@/utils/packages/filters';

export interface IInitialState {
  allBrands: BrandsResponseDto | null;
  allAttributes: AttributesResponseDto | null;
  allCategories: CategoriesResponseDto | null;
  selectedCategoryId: number | null;
  selectedSort: string | null;
  isSortPopoverOpen: boolean;
  selectedBrands: string[] | null;
  selectedAttributes: string[] | null;
  selectedPriceRange: number[];
  selectedCameraRange: number[];
  dataStatus: DataStatus;
}

const initialState: IInitialState = {
  allBrands: null,
  allAttributes: null,
  allCategories: null,
  selectedCategoryId: null,
  selectedSort: Sort.POPULARITY.value,
  isSortPopoverOpen: false,
  selectedBrands: null,
  selectedAttributes: null,
  selectedPriceRange: [0, 100000],
  selectedCameraRange: [0, 0],
  dataStatus: DataStatus.IDLE,
};

const filters_slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSelectedCategory(state, { payload }: { payload: number }) {
      state.selectedCategoryId = payload;
    },
    setSelectedSort(state, { payload }: { payload: string }) {
      state.selectedSort = payload;
    },
    setSortPopoverOpen(state, { payload }: { payload: boolean }) {
      state.isSortPopoverOpen = payload;
    },
    setSelectedBrands(state, { payload }: { payload: string[] }) {
      state.selectedBrands = payload;
    },
    setSelectedAttributes(state, { payload }: { payload: string[] }) {
      state.selectedAttributes = payload;
    },
    setSelectedPriceRange(state, { payload }: { payload: number[] }) {
      state.selectedPriceRange = payload;
    },
    setSelectedCameraRange(state, { payload }: { payload: number[] }) {
      state.selectedCameraRange = payload;
    },
    resetFilters(state) {
      state.allBrands = null;
      state.allAttributes = null;
      state.allCategories = null;
      state.selectedSort = Sort.POPULARITY.value;
      state.selectedBrands = null;
      state.selectedAttributes = null;
      state.selectedPriceRange = [0, 100000];
      state.selectedCameraRange = [0, 0];
      state.dataStatus = DataStatus.IDLE;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllBrands.fulfilled, (state, { payload }) => {
      state.allBrands = payload;
    });
    builder.addCase(getAllCategories.fulfilled, (state, { payload }) => {
      state.allCategories = payload;
    });
    builder.addCase(getAllAttributes.fulfilled, (state, { payload }) => {
      state.allAttributes = payload;
    });

    builder.addMatcher(
      isAnyOf(
        getAllBrands.fulfilled,
        getAllCategories.fulfilled,
        getAllAttributes.fulfilled,
      ),
      (state) => {
        state.dataStatus = DataStatus.FULFILLED;
      },
    );
    builder.addMatcher(
      isAnyOf(
        getAllBrands.rejected,
        getAllCategories.rejected,
        getAllAttributes.rejected,
      ),
      (state) => {
        state.dataStatus = DataStatus.REJECT;
      },
    );
    builder.addMatcher(
      isAnyOf(
        getAllBrands.pending,
        getAllCategories.pending,
        getAllAttributes.pending,
      ),
      (state) => {
        state.dataStatus = DataStatus.PENDING;
      },
    );
  },
});

export const {
  setSelectedSort,
  setSelectedBrands,
  setSortPopoverOpen,
  setSelectedAttributes,
  setSelectedPriceRange,
  setSelectedCameraRange,
  setSelectedCategory,
  resetFilters,
} = filters_slice.actions;

export const { actions, reducer } = filters_slice;
