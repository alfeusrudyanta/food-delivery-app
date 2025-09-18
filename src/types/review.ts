type ReviewUser = {
  id: number;
  name: string;
};

type ReviewRestaurant = {
  id: number;
  name: string;
};

type PostedReview = {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  user: ReviewUser;
  restaurant: ReviewRestaurant;
};

type RestaurantRating = null | 1 | 2 | 3 | 4 | 5;

type Review = {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  user: ReviewUser;
};

type RestaurantInfo = {
  id: number;
  name: string;
  star: number;
};

type RatingDistribution = {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
};

type ReviewStatistics = {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: RatingDistribution;
};

type ReviewPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type MyReviewRestaurant = {
  id: number;
  name: string;
  logo: string;
};

type MyReview = {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  restaurant: MyReviewRestaurant;
};

type UpdatedReviewRestaurant = {
  id: number;
  name: string;
};

type UpdatedReview = {
  id: number;
  star: number;
  comment: string;
  updatedAt: string;
  restaurant: UpdatedReviewRestaurant;
};

type PostReviewReq = {
  transactionId: string;
  restaurantId: number;
  star: number;
  comment: string;
};

type PostReviewRes = {
  success: boolean;
  message: string;
  data: {
    review: PostedReview;
  };
};

type GetRestaurantReviewParamsReq = {
  page?: number;
  limit?: number;
  rating?: RestaurantRating;
};

type GetRestaurantReviewRes = {
  success: boolean;
  data: {
    restaurant: RestaurantInfo;
    reviews: Review[];
    statistics: ReviewStatistics;
    pagination: ReviewPagination;
  };
};

type GetMyReviewParamsReq = {
  page?: number;
  limit?: number;
};

type GetMyReviewRes = {
  success: boolean;
  message: string;
  data: {
    reviews: MyReview[];
    pagination: ReviewPagination;
  };
};

type PutReviewReq = {
  star: number;
  comment: string;
};

type PutReviewRes = {
  success: boolean;
  message: string;
  data: {
    review: UpdatedReview;
  };
};

type DeleteReviewRes = {
  success: boolean;
  message: string;
  data: null;
};

export type {
  PostReviewReq,
  PostReviewRes,
  GetRestaurantReviewParamsReq,
  GetRestaurantReviewRes,
  GetMyReviewParamsReq,
  GetMyReviewRes,
  PutReviewReq,
  PutReviewRes,
  DeleteReviewRes,
};
