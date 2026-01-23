import { apiRequest } from '@/utils/api';

export interface IResponse {
  inserted_id: string
}

export const createUserApi = async (data: unknown): Promise<IResponse> => {
  const response = await apiRequest.post('/v1/master/users', data);

  return response.data;
};
