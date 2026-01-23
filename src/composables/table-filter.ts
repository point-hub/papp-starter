import { reactive } from 'vue';

interface IOption {
 initialFilter: Record<string, string>
 initialSortKeys: Record<string, 1 | 0 | -1>
 defaultPageSize?: number
}

/**
 * A reusable composable for managing filters, sorting, and pagination.
 */
export function useTableFilter(options: IOption) {
  const { initialFilter, initialSortKeys, defaultPageSize = 10 } = options;

  /**
   * Reactive filter object based on the provided initial filter.
   */
  const initialFilterState = { ...initialFilter };
  const filter = reactive<Record<string, string>>({ ...initialFilter });
  /**
   * Reactive sort object with all keys initialized to 0 (no sort).
   * Values: 1 = ascending, -1 = descending, 0 = no sort
   */
  const initialSortState = { ...initialSortKeys };
  const sort = reactive<Record<string, 1 | 0 | -1>>({...initialSortKeys});

  /**
   * Reactive pagination object.
   */
  const pagination = reactive({
    page: 1,
    page_count: 0,
    page_size: defaultPageSize,
    total_document: 0,
  });

  /**
   * Resets all filters to empty strings and sort states to 0 (no sort).
   */
  const resetFilter = () => {
    Object.keys(initialFilterState).forEach(key => {
      filter[key] = initialFilterState[key] ?? '';
    });

    Object.keys(initialSortState).forEach(key => {
      sort[key] = initialSortState[key] ?? 0;
    });
  };

  /**
   * Converts the sort object to a string format, e.g., "name,-email"
   *
   * @param {Record<string, 1 | 0 | -1>} sort - The sort object to convert.
   * @returns {string} - A comma-separated sort string for API requests.
   */
  const sortObjectToString = (sort: Record<string, 1 | 0 | -1>): string => {
    return Object.entries(sort)
      .filter(([, value]) => value !== 0)
      .map(([key, value]) => (value === -1 ? `-${key}` : key))
      .join(',');
  };

  /**
   * Toggles sort state for a given key:
   * 0 -> 1 (asc) -> -1 (desc) -> 0 (none)
   *
   * @param {string} key - The key to toggle sort for.
   */
  const toggleSort = (key: string) => {
    if (sort[key] === 0) {
      sort[key] = 1;
    } else if (sort[key] === 1) {
      sort[key] = -1;
    } else {
      sort[key] = 0;
    }
  };

  /**
   * Resets the pagination to page 1 with an optional new page size.
   *
   * @param {number} [pageSize=defaultPageSize] - The new page size.
   */
  const resetPagination = (pageSize: number = defaultPageSize) => {
    pagination.page = 1;
    pagination.page_size = pageSize;
  };

  return {
    filter,
    sort,
    pagination,
    resetFilter,
    sortObjectToString,
    toggleSort,
    resetPagination,
  };
}
