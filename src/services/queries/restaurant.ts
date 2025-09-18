import type {
  GetRestoParamsReq,
  GetRestoRecommendedRes,
  GetRestoRes,
  GetRestoIdParamsReq,
  GetRestoIdRes,
} from '@/types/restaurant';
import AxiosInstance from '../api/axios';

const apiRestaurant = {
  getResto: async (params: GetRestoParamsReq): Promise<GetRestoRes> => {
    const res = await AxiosInstance.get('/api/resto', { params });
    return res.data;
  },
  getRestoRecommended: async (): Promise<GetRestoRecommendedRes> => {
    const res = await AxiosInstance.get('/api/resto/recommended');
    return res.data;
  },
  getRestoId: async (
    id: number,
    params: GetRestoIdParamsReq
  ): Promise<GetRestoIdRes> => {
    const res = await AxiosInstance.get(`/api/resto/${id}`, { params });
    return res.data;
  },
};

export default apiRestaurant;
