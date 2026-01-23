export interface IPagination {
  page: number
  page_count: number
  page_size: number
  total_document: number
}

export interface IQuery {
  filter?: Record<string, unknown>
  search?: Record<string, unknown>
  sort?: string
  page?: number
  page_size?: number
  [key: string]: unknown
}