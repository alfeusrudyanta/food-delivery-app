import type {
  PostCheckoutReq,
  PostCheckoutRes,
  GetMyOrderParamsReq,
  GetMyOrderRes,
  PutOrderStatusReq,
  PutOrderStatusRes,
} from '@/types/order';
import AxiosInstance from '../api/axios';

const apiOrder = {
  PostCheckout: async (data: PostCheckoutReq): Promise<PostCheckoutRes> => {
    const res = await AxiosInstance.post('/api/order/checkout', data);
    return res.data;
  },
  getMyOrder: async (params: GetMyOrderParamsReq): Promise<GetMyOrderRes> => {
    const res = await AxiosInstance.get('/api/order/my-order', { params });
    return res.data;
  },
  putOrderStatus: async (
    id: number,
    data: PutOrderStatusReq
  ): Promise<PutOrderStatusRes> => {
    const res = await AxiosInstance.put(`/api/order/${id}/status`, data);
    return res.data;
  },
};

export default apiOrder;
