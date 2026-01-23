import { apiRequest } from '@/utils/api';

interface IData {
  email: string
}

export interface IResponse {
  exists: boolean
}

export const isEmailExistsApi = async (data: IData): Promise<IResponse> => {
  const response = await apiRequest.post('/v1/auth/is-email-exists', { email: data.email });

  return response.data;
};
