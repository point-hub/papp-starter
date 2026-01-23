import { computed, reactive, ref } from 'vue';

interface IColumn {
  label: string
  isVisible: boolean
  isSelectable: boolean
}

interface IPageSizeOption {
  size: number
  label: string
}

interface IOptions {
  columns: Record<string, IColumn>
}

export function useTableSetting(options: IOptions) {
  const isOpen = ref(false);

  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  const open = () => {
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
  };

  const pageSizeOptions: [IPageSizeOption, ...IPageSizeOption[]] = [
    { size: 10, label: '10' },
    { size: 25, label: '25' },
    { size: 50, label: '50' },
    { size: 100, label: '100' },
  ];

  const pageSize = ref<IPageSizeOption>(pageSizeOptions[0]);

  const columns = reactive<Record<string, IColumn>>({ ...options.columns });
  const initialColumns = { ...columns };

  const visibleColumns = computed(() => {
    return Object.keys(columns)
      .filter((key) => columns[key]?.isVisible)
      .join(',');
  });

  const countVisibleColumns = computed(() => {
    return Object.values(columns).filter((col) => col.isVisible).length;
  });

  const resetTableSetting = () => {
    pageSize.value = pageSizeOptions[0];
    Object.keys(initialColumns).forEach(key => {
      columns[key]!.isVisible = initialColumns[key]!.isVisible;
    });
  };

  return {
    isOpen,
    open,
    close,
    toggle,
    columns,
    visibleColumns,
    countVisibleColumns,
    pageSize,
    pageSizeOptions,
    resetTableSetting,
  };
}
