import { apiRequest } from '@/utils/api';

export interface IResponse {
  _id: string
  code: string
  name: string
  composite_unique_1: string
  composite_unique_2: string
  age: number
  gender: string
  optional_unique: string
  notes: string
  is_archived: boolean
  created_at: Date
  created_by_id: string
}

// Use a shared controller that can be replaced
let controller: AbortController | null = null;

export const findExampleApi = async (_id: string): Promise<IResponse> => {
  // Abort the previous request if it exists
  if (controller) {
    controller.abort();
  }

  // Create a new AbortController for this request
  controller = new AbortController();
  const response = await apiRequest.get(`/v1/master/examples/${_id}`, {
    signal: controller.signal,
  });

  return response.data;
};
