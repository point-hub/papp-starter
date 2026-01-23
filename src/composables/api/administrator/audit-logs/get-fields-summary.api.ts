import type { IQuery } from '@/types';
import { apiRequest } from '@/utils/api';

export interface IGetFieldsSummaryData {
  actor_id?: string
  actor_name?: string
  field?: string
  newest_created_at?: Date
}

export interface IGetFieldsSummaryApiResponse {
  data: IGetFieldsSummaryData[]
  pagination: {
    page: number
    page_count: number
    page_size: number
    total_document: number
  }
}

export const getFieldsSummaryApi = async (query?: IQuery): Promise<IGetFieldsSummaryApiResponse> => {
  const response = await apiRequest.get(`/v1/audit-logs/${query?.filter?.entity_id}/fields-summary`, {
    params: {
      filter: query?.filter,
      group_by_operation_id: query?.group_by_operation_id,
      page: query?.page || 1,
      page_size: query?.page_size || 10,
      sort: query?.sort || '-_id',
    },
  });

  return response.data;
};
