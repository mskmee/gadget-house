import { DataStatus } from "@/enums/data-status";
import { createSlice } from "@reduxjs/toolkit"
import { getReviews } from "./actions";
import { GetReviewResponseDTO } from "@/utils/packages/singleProduct/type/types";

export interface ReviewFormState {
  userId: number | null;
  productId: number | null;
  text: string | null;
  rate: number | null;
  dataStatus: DataStatus;
  error: string | null,
  reviews: GetReviewResponseDTO | null;
}

const initialState: ReviewFormState = {
  userId: null,
  productId: null,
  text: null,
  rate: null,
  reviews: null,
  dataStatus: DataStatus.IDLE,
  error: null,
}

const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getReviews.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
      state.error = null;
    })
    .addCase(getReviews.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.reviews = action.payload;
    })
    .addCase(getReviews.rejected, (state, action) => {
      state.dataStatus = DataStatus.REJECT;
      state.error = action.payload as string;
    });
  },
})

export const {actions, reducer} = singleProductSlice;