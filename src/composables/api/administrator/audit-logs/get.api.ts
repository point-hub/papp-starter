import type { IQuery } from '@/types';
import { apiRequest } from '@/utils/api';

export interface IGetAuditLogsData {
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
  changes?: {
    summary?: {
      fields?: string[]
      count?: number
    }
    snapshot?: {
      before?: Record<string, unknown>
      after?: Record<string, unknown>
    }
  }
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

export interface IGetAuditLogsApiResponse {
  data: IGetAuditLogsData[]
  pagination: {
    page: number
    page_count: number
    page_size: number
    total_document: number
  }
}

export const getAuditLogsApi = async (query?: IQuery): Promise<IGetAuditLogsApiResponse> => {
  const response = await apiRequest.get('/v1/audit-logs', {
    params: {
      search: query?.search,
      group_by_operation_id: query?.group_by_operation_id,
      page: query?.page || 1,
      page_size: query?.page_size || 10,
      sort: query?.sort || '-_id',
    },
  });

  return response.data;
};
