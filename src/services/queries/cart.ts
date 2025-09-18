import type {
  DeleteAllCartRes,
  DeleteCartRes,
  GetCartRes,
  PostCartReq,
  PostCartRes,
  PutCartReq,
  PutCartRes,
} from '@/types/cart';
import AxiosInstance from '../api/axios';

const apiCart = {
  getCart: async (): Promise<GetCartRes> => {
    const res = await AxiosInstance.get('/api/cart');
    return res.data;
  },
  postCart: async (data: PostCartReq): Promise<PostCartRes> => {
    const res = await AxiosInstance.post('/api/cart', data);
    return res.data;
  },
  deleteAllCart: async (): Promise<DeleteAllCartRes> => {
    const res = await AxiosInstance.delete('/api/cart');
    return res.data;
  },
  putCart: async (id: number, data: PutCartReq): Promise<PutCartRes> => {
    const res = await AxiosInstance.put(`/api/cart/${id}`, data);
    return res.data;
  },
  deleteCart: async (id: number): Promise<DeleteCartRes> => {
    const res = await AxiosInstance.delete(`/api/cart/${id}`);
    return res.data;
  },
};

export default apiCart;
