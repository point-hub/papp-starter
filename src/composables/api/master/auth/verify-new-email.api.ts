import { apiRequest } from '@/utils/api';

interface IData {
  code: string
}

interface IResponse {
  email: string
}

export const verifyNewEmailApi = async (data: IData): Promise<IResponse> => {
  const response = await apiRequest.post('/v1/auth/verify-new-email', {
    code: data.code,
  });

  return response.data;
};
