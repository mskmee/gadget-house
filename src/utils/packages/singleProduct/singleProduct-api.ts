import { ApiEndpoint, HttpMethod, request } from "../http";

import { ISingleProductApi } from "./type/singleProduct-api.interface";
import { AddReviewRequestDTO, AddReviewResponseDTO, GetReviewResponseDTO } from "./type/types";

class SingleProductAPI implements ISingleProductApi {
  async addReview(data: AddReviewRequestDTO): Promise<AddReviewResponseDTO> {
    return request({
      method: HttpMethod.POST,
      url: `${ApiEndpoint.PRODUCT_REVIEW}/${productId}`,
      body: {data}
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

