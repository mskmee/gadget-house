import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

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
  selectedSort: Sort.RATING_HIGHTOLOW.value,
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
    // 🔥 CATEGORY CHANGE = RESET FILTERS
    setSelectedCategory(state, action: PayloadAction<number | null>) {
      state.selectedCategoryId = action.payload;

      // reset only filter values
      state.selectedBrands = null;
      state.selectedAttributes = null;
      state.selectedPriceRange = [0, 100000];
      state.selectedCameraRange = [0, 0];
      state.selectedSort = Sort.RATING_HIGHTOLOW.value;
    },

    setSelectedSort(state, action: PayloadAction<string>) {
      state.selectedSort = action.payload;
    },

    setSortPopoverOpen(state, action: PayloadAction<boolean>) {
      state.isSortPopoverOpen = action.payload;
    },

    setSelectedBrands(state, action: PayloadAction<string[] | null>) {
      state.selectedBrands = action.payload;
    },

    setSelectedAttributes(state, action: PayloadAction<string[] | null>) {
      state.selectedAttributes = action.payload;
    },

    setSelectedPriceRange(state, action: PayloadAction<number[]>) {
      state.selectedPriceRange = action.payload;
    },

    setSelectedCameraRange(state, action: PayloadAction<number[]>) {
      state.selectedCameraRange = action.payload;
    },

    // manual reset if needed
    resetFilters(state) {
      state.selectedBrands = null;
      state.selectedAttributes = null;
      state.selectedPriceRange = [0, 100000];
      state.selectedCameraRange = [0, 0];
      state.selectedSort = Sort.RATING_HIGHTOLOW.value;
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

export const actions = filters_slice.actions; // add this
export const { reducer } = filters_slice;