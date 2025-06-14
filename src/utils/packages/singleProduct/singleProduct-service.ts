import { ISingleProductApi } from "./type/singleProduct-api.interface";
import { ISingleProductService } from "./type/singleProduct-service.interface";
import { AddReviewRequestDTO, AddReviewResponseDTO, GetReviewResponseDTO } from "./type/types";

class SingleProductService implements ISingleProductService {
  private singleProductAPI: ISingleProductApi;
  constructor(singleProductAPI: ISingleProductApi) {
    this.singleProductAPI = singleProductAPI;
  }

  async addReview(data: AddReviewRequestDTO): Promise<AddReviewResponseDTO> {
    return this.singleProductAPI.addReview(data)
  }

  async getReviews({productId, page}: {productId: number, page: number}): Promise<GetReviewResponseDTO> {
    return this.singleProductAPI.getReviews({productId, page});
  }
}

export {SingleProductService}