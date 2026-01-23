import { apiRequest } from '@/utils/api';

export interface IResponse {
  deleted_count: number
}

export const deleteRoleApi = async (_id: string, delete_reason?: string): Promise<IResponse | undefined> => {
  const response = await apiRequest.delete(`/v1/master/roles/${_id}`, {
    data: {
      delete_reason,
    },
  });
  if (response.status === 200) {
    return response.data;
  }
};
