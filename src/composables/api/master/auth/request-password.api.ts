import { apiRequest } from '@/utils/api';

interface IData {
  email: string
}

interface IResponse {
  matched_count: string
  modified_count: string
}

export const requestPasswordApi = async (data: IData): Promise<IResponse> => {
  const response = await apiRequest.post('/v1/auth/request-password', {
    email: data.email,
  });

  return response.data;
};
