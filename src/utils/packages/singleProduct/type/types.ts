export type AddReviewRequestDTO = {
  productId: number | null;
  text: string | '';
  rate: number | null;
};

export type GetReviewPages = {
  productId: number;
  page: number;
};

export type AddReviewResponseDTO = {
  user: {
    fullName: string;
  };
  text: string;
  rate: number;
  createdAt: number;
};

export type ReviewItem = {
  user: {
    fullName: string;
  };
  text: string;
  rate: number;
  createdAt: string;
};

export type GetReviewResponseDTO = {
  page: ReviewItem[];
  totalElements: number;
  currentPage: number;
  totalPages: number;
};
