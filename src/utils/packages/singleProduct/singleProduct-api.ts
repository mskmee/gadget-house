import { ApiEndpoint, HttpMethod, request } from "../http";

import { ISingleProductApi } from "./type/singleProduct-api.interface";
import { AddReviewRequestDTO, AddReviewResponseDTO, GetReviewResponseDTO } from "./type/types";

class SingleProductAPI implements ISingleProductApi {
  async addReview(data: AddReviewRequestDTO): Promise<AddReviewResponseDTO> {
    // eslint-disable-next-line no-unused-vars
    const {productId, rate, text} = data;
    return request({
      method: HttpMethod.POST,
      url: `${ApiEndpoint.PRODUCT_REVIEW}/${productId}`,
      body: {rate, text}
    })
  }

  async getReviews({productId, page}: {productId: number, page: number}): Promise<GetReviewResponseDTO> {
    return request({
      method: HttpMethod.GET,
      url: `${ApiEndpoint.PRODUCT_REVIEW}/${productId}?page=${page}`,
    })
  }
}

export {SingleProductAPI}

