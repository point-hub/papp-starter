import type { IQuery } from '@/types';
import { apiRequest } from '@/utils/api';

export interface IGetFieldHistoriesData {
  _id?: string
  operation_id?: string
  entity_type?: string
  entity_id?: string
  entity_ref?: string
  actor_type?: string
  actor_id?: string
  actor_name?: string
  action?: string
  module?: string
  system_reason?: string
  user_reason?: string
  field?: string
  before?: string
  after?: string
  metadata?: {
    ip?: string
    device?: {
      type?: string
      model?: string
      vendor?: string
    }
    browser?: {
      type?: string
      name?: string
      version?: string
    }
    os?: {
      name?: string
      version?: string
    }
  }
  created_at?: Date
}

export interface IGetFieldHistoriesApiResponse {
  data: IGetFieldHistoriesData[]
  pagination: {
    page: number
    page_count: number
    page_size: number
    total_document: number
  }
}

export const getFieldHistoriesApi = async (query?: IQuery): Promise<IGetFieldHistoriesApiResponse> => {
  const response = await apiRequest.get(`/v1/audit-logs/${query?.filter?.entity_id}/field-histories`, {
    params: {
      search: query?.filter,
      group_by_operation_id: query?.group_by_operation_id,
      page: query?.page || 1,
      page_size: query?.page_size || 10,
      sort: query?.sort || '-_id',
    },
  });

  return response.data;
};
