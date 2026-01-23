import { apiRequest } from '@/utils/api';

interface IData {
  name: string
  username: string
  email: string
  password: string
}

export interface IResponse {
  inserted_id: string
  user: {
    _id: string
    name: string
    username: string
    email: string
  },
}

export const signupApi = async (data: IData): Promise<IResponse> => {
  const response = await apiRequest.post('/v1/auth/signup', {
    name: data.name,
    username: data.username,
    email: data.email,
    password: data.password,
  });

  return response.data;
};
