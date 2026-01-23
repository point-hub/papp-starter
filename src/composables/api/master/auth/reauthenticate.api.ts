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

export const reauthenticateApi = async (): Promise<IResponse> => {
  const response = await apiRequest.get('/v1/auth/me');

  return response.data;
};
