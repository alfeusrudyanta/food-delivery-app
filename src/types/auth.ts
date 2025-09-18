type UserBase = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

type UserWithCreatedAt = UserBase & {
  createdAt: string;
};

type PostRegisterReq = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

type PostRegisterRes = {
  success: boolean;
  message: string;
  data: {
    user: UserWithCreatedAt;
    token: string;
  };
};

type PostLoginReq = {
  email: string;
  password: string;
};

type PostLoginRes = {
  success: boolean;
  message: string;
  data: {
    user: UserBase;
    token: string;
  };
};

type GetProfileRes = {
  success: true;
  message: string;
  data: UserBase;
};

type PutProfileReq = {
  name: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
};

type PutProfileRes = {
  success: boolean;
  message: string;
  data: UserWithCreatedAt;
};

export type {
  PostRegisterReq,
  PostRegisterRes,
  PostLoginReq,
  PostLoginRes,
  GetProfileRes,
  PutProfileReq,
  PutProfileRes,
};
