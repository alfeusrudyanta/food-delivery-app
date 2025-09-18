import type {
  DeleteReviewRes,
  GetMyReviewParamsReq,
  GetMyReviewRes,
  GetRestaurantReviewParamsReq,
  GetRestaurantReviewRes,
  PostReviewReq,
  PostReviewRes,
  PutReviewReq,
  PutReviewRes,
} from '@/types/review';
import AxiosInstance from '../api/axios';

const apiReview = {
  postReview: async (data: PostReviewReq): Promise<PostReviewRes> => {
    const res = await AxiosInstance.post('/api/review', data);
    return res.data;
  },
  getRestaurantReview: async (
    id: number,
    params: GetRestaurantReviewParamsReq
  ): Promise<GetRestaurantReviewRes> => {
    const res = await AxiosInstance.get(`/api/review/restaurant/${id}`, {
      params,
    });
    return res.data;
  },
  getMyReview: async (
    params: GetMyReviewParamsReq
  ): Promise<GetMyReviewRes> => {
    const res = await AxiosInstance.get('/api/review/my-reviews', { params });
    return res.data;
  },
  putReview: async (id: number, data: PutReviewReq): Promise<PutReviewRes> => {
    const res = await AxiosInstance.put(`/api/review/${id}`, data);
    return res.data;
  },
  deleteReview: async (id: number): Promise<DeleteReviewRes> => {
    const res = await AxiosInstance.delete(`/api/review/${id}`);
    return res.data;
  },
};

export default apiReview;
