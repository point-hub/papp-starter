import { apiRequest } from '@/utils/api';

export interface IResponse {
  inserted_id: string
}

export const createRoleApi = async (data: unknown): Promise<IResponse> => {
  const response = await apiRequest.post('/v1/master/roles', data);

  return response.data;
};
