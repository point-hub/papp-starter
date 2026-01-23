import { apiRequest } from '@/utils/api';

export interface IResponse {
  _id: string
  code: string
  name: string
  notes: string
  permissions: string[]
  is_archived: boolean
  created_at: Date
  created_by_id: string
}

// Use a shared controller that can be replaced
let controller: AbortController | null = null;

export const findRoleApi = async (_id: string): Promise<IResponse> => {
  // Abort the previous request if it exists
  if (controller) {
    controller.abort();
  }

  // Create a new AbortController for this request
  controller = new AbortController();
  const response = await apiRequest.get(`/v1/master/roles/${_id}`, {
    signal: controller.signal,
  });

  return response.data;
};
