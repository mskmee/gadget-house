import { AddReviewRequestDTO, AddReviewResponseDTO, GetReviewResponseDTO } from "./types";

interface ISingleProductService {
  // eslint-disable-next-line no-unused-vars
  addReview:(data: AddReviewRequestDTO) => Promise<AddReviewResponseDTO>;
  // eslint-disable-next-line no-unused-vars
  getReviews: ({productId, page}: {productId: number, page: number}) => Promise<GetReviewResponseDTO>
}

export {type ISingleProductService}