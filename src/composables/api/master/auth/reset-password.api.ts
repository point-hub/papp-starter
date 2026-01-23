import { apiRequest } from '@/utils/api';

interface IData {
  code: string
  password: string
}

interface IResponse {
  matched_count: number
  modified_count: number
}

export const resetPasswordApi = async (data: IData): Promise<IResponse> => {
  const response = await apiRequest.post('/v1/auth/reset-password', {
    code: data.code,
    password: data.password,
  });

  return response.data;
};
