import { singleProductService } from "@/utils/packages/singleProduct";
import { AddReviewRequestDTO } from "@/utils/packages/singleProduct/type/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

const addReview = createAsyncThunk('product/addReview', async(data: AddReviewRequestDTO) => {
  return await singleProductService.addReview(data)
})

const getReviews = createAsyncThunk('product/getReviews', async({productId, page}: {productId: number, page: number}) => {
  return await singleProductService.getReviews({productId, page})
})

export {addReview, getReviews}