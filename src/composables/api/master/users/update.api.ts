import { apiRequest } from '@/utils/api';

interface IResponse {
  matched_count: string
  modified_count: string
}

export const updateUserApi = async (id: string, data: unknown): Promise<IResponse> => {
  const response = await apiRequest.patch(`/v1/master/users/${id}`, data);

  return response.data;
};
