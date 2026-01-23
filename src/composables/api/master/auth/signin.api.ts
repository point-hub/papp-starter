import { apiRequest } from '@/utils/api';

interface IData {
  username: string
  password: string
  remember_me: boolean
}

export interface IResponse {
  _id?: string
  username?: string
  name?: string
  email?: string
  role?: {
    _id?: string
    name?: string
    permissions?: string[]
  }
}

export const signinApi = async (data: IData): Promise<IResponse> => {
  const response = await apiRequest.post('/v1/auth/signin', {
    username: data.username,
    password: data.password,
    remember_me: data.remember_me,
  });

  return response.data;
};
