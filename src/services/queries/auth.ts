import type {
  PostLoginReq,
  PostLoginRes,
  PostRegisterReq,
  PostRegisterRes,
  GetProfileRes,
  PutProfileReq,
  PutProfileRes,
} from '@/types/auth';
import AxiosInstance from '@/services/api/axios';

const apiAuth = {
  postRegister: async (data: PostRegisterReq): Promise<PostRegisterRes> => {
    const res = await AxiosInstance.post('/api/auth/register', data);
    return res.data;
  },
  postLogin: async (data: PostLoginReq): Promise<PostLoginRes> => {
    const res = await AxiosInstance.post('/api/auth/login', data);
    return res.data;
  },
  getProfile: async (): Promise<GetProfileRes> => {
    const res = await AxiosInstance.get('/api/auth/profile');
    return res.data;
  },
  putProfile: async (data: PutProfileReq): Promise<PutProfileRes> => {
    const res = await AxiosInstance.put('/api/auth/profile', data);
    return res.data;
  },
};

export default apiAuth;
