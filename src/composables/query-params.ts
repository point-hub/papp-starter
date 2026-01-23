import type { Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import type { IPagination } from '@/types';

export interface IPageSize {
  size: number
  label: string
}

export interface IQueryContext {
  /**
   * This is the raw input from the URL. Usually, you pass route.query here.
   * It serves as the data source that applyQueryParams iterates
   * through to populate all the other reactive objects in this interface.
   */
  query: Record<string, unknown>;
  /**
   * Stores the active search criteria. The logic specifically looks for URL keys starting with search.
   * Example: A URL param search.name=John is parsed into this object as { name: 'John' }.
   */
  filter: Record<string, string>;
  /**
   * Description: Represents the order of the data.
   * 1: Ascending order.
   * -1: Descending order.
   * 0: No sorting applied.
   */
  sort: Record<string, 1 | 0 | -1>;
  /**
   * A plain object holding the numeric state of the list's position.
   * It typically tracks the current page and page_size.
   * When the URL has ?page=2, this object is updated so your API call knows which slice of data to fetch.
   */
  pagination: IPagination;
  /**
   * A Vue Ref that holds the currently selected "Page Size" object
   * (containing both the numeric size and the display label). This is separate
   * from pagination.page_size because it often drives a UI dropdown component.
   */
  pageSize: Ref<IPageSize>;
  /**
   * A non-empty array of available page size choices (e.g., 10, 20, 50). It is used during the
   * "hydration" process: if the URL says page-size=50, the logic searches this array to find
   * the matching option object to assign to pageSize.
   */
  pageSizeOptions: [IPageSize, ...IPageSize[]];
  /**
   * Manages the visibility of table columns.
   * isVisible: Whether the column is currently shown.
   * isSelectable: A safeguard. The logic will only allow the URL to toggle visibility if this is true.
   * This prevents users from hiding "protected" columns via the URL.
   */
  columns: Record<string, { isVisible: boolean; isSelectable: boolean }>;
}


export function useQueryParams() {
  const route = useRoute();
  const router = useRouter();

  const flattenQuery = (query: Record<string, string | number | Record<string, unknown>>) => {
    const result: Record<string, string> = {};

    for (const key in query) {
      const value = query[key];

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        for (const nestedKey in value) {
          result[`${key}.${nestedKey}`] = String(value[nestedKey]);
        }
      } else {
        result[key] = value !== '' ? String(value) : '';
      }
    }


    return result;
  };

  const updateQueryParams = async (query: Record<string, string | number | Record<string, unknown>>) => {
    const newQuery = flattenQuery(query);

    const mergedQuery = {
      ...route.query,
      ...newQuery,
    };

    const cleanedQuery = Object.fromEntries(
      Object.entries(mergedQuery).filter(([key, value]) => value !== '' && !(key === 'page' && value === '1')),
    );

    await router.push({ query: cleanedQuery });
  };

  function applyQueryParams(ctx: IQueryContext) {
    const {
      query,
      filter,
      sort,
      pagination,
      pageSize,
      pageSizeOptions,
      columns,
    } = ctx;

    Object.entries(query).forEach(([key, value]) => {
      if (typeof value !== 'string') return;

      if (key.startsWith('search.')) {
        const field = key.slice(7).trim();

        if (field) {
          filter[field] = value;
        }
        return;
      }

      switch (key) {
      case 'sort':
        value.split(',').forEach((entry) => {
          const direction = entry.startsWith('-') ? -1 : 1;
          const fieldName = entry.replace(/^[-+]/, '');
          sort[fieldName] = direction;
        });
        break;

      case 'page':
        pagination.page = parseInt(value) || 1;
        break;

      case 'page-size':
        pagination.page_size = parseInt(value) || 10;
        pageSize.value = pageSizeOptions.find((option) => option.size === pagination.page_size) ?? pageSizeOptions[0];
        break;

      case 'columns':
        {
          const visible = value.split(',').map((col) => col.trim());
          Object.entries(columns).forEach(([colKey, colVal]) => {
            if (colVal.isSelectable) {
              colVal.isVisible = visible.includes(colKey);
            }
          });
        }
        break;
      }
    });
  }

  return { updateQueryParams, applyQueryParams };
}
