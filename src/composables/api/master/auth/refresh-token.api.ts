import { apiRequest } from '@/utils/api';

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

export const refreshTokenApi = async (): Promise<IResponse> => {
  const response = await apiRequest.post('/v1/auth/refresh');

  return response.data;
};
