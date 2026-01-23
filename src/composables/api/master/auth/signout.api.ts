import { apiRequest } from '@/utils/api';

export const signoutApi = async (): Promise<void> => {
  await apiRequest.post('/v1/auth/signout');
};
