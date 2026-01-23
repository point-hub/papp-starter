import { apiRequest } from '@/utils/api';

interface IData {
  password: string
}

export const verifyPasswordApi = async (data: IData): Promise<boolean> => {
  const response = await apiRequest.post('/v1/auth/verify-password', data);

  return response.data;
};
