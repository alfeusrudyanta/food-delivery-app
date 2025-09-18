type PriceRange = {
  min: number;
  max: number;
};

type Restaurant = {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  reviewCount: number;
  menuCount: number;
  priceRange: PriceRange;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type Filters = {
  range: number | null;
  priceMin: number | null;
  priceMax: number | null;
  rating: number | null;
};

type MenuItem = {
  id: number;
  foodName: string;
  price: number;
  type: string;
  image: string;
};

type RecommendedRestaurant = {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  reviewCount: number;
  sampleMenus: MenuItem[];
  isFrequentlyOrdered: boolean;
};

type Coordinates = {
  lat: number;
  long: number;
};

type ReviewUser = {
  id: number;
  name: string;
};

type Review = {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  user: ReviewUser;
};

type RestaurantDetail = {
  id: number;
  name: string;
  star: number;
  averageRating: number;
  place: string;
  coordinates: Coordinates;
  logo: string;
  images: string[];
  totalMenus: number;
  totalReviews: number;
  menus: MenuItem[];
  reviews: Review[];
};

type GetRestoParamsReq = {
  location?: string;
  range?: number;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  page?: number;
  limit?: number;
};

type GetRestoRes = {
  success: boolean;
  message: string;
  data: {
    restaurants: Restaurant[];
    pagination: Pagination;
    filters: Filters;
  };
};

type GetRestoRecommendedRes = {
  success: boolean;
  message: string;
  data: {
    recommendations: RecommendedRestaurant[];
    message: string;
  };
};

type GetRestoIdParamsReq = {
  limitMenu?: number;
  limitReview?: number;
};

type GetRestoIdRes = {
  success: boolean;
  message: string;
  data: RestaurantDetail;
};

export type {
  GetRestoParamsReq,
  GetRestoRes,
  GetRestoRecommendedRes,
  GetRestoIdParamsReq,
  GetRestoIdRes,
};
