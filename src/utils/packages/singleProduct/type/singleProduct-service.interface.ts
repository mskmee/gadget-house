import { AddReviewRequestDTO, AddReviewResponseDTO, GetReviewResponseDTO } from "./types";

interface ISingleProductService {
  addReview:(data: AddReviewRequestDTO) => Promise<AddReviewResponseDTO>;
  getReviews: ({productId, page}: {productId: number, page: number}) => Promise<GetReviewResponseDTO>
}

export {type ISingleProductService}