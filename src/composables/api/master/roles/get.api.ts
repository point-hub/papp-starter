import type { IPagination, IQuery } from '@/types';
import { apiRequest } from '@/utils/api';

export interface IRoleData {
  _id: string
  code: string
  name: string
  notes: string
  permissions: string
  is_archived: string
  created_at: Date
  created_by_id: string
}

export interface IResponse {
  data: IRoleData[]
  pagination: IPagination
}

// Use a shared controller that can be replaced
let controller: AbortController | null = null;

export const getRolesApi = async (query?: IQuery): Promise<IResponse> => {
  // Abort the previous request if it exists
  if (controller) {
    controller.abort();
  }

  // Create a new AbortController for this request
  controller = new AbortController();
  const response = await apiRequest.get('/v1/master/roles', {
    params: {
      search: query?.search,
      page: query?.page || 1,
      page_size: query?.page_size || 10,
      sort: query?.sort || '-_id',
    },
    signal: controller.signal,
  });

  return response.data;
};
