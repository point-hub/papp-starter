import { ref } from 'vue';

export interface IToastRef {
  toast(
    message: string,
    options?: {
      lists?: string[]
      color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger'
      autoClose?: boolean
      timer?: number
    }
  ): void
}

export const toastRef = ref<IToastRef | null>(null);

// Safe wrapper function to call toast
export const toast = (
  message: string,
  options?: {
    lists?: string[]
    color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger'
    autoClose?: boolean
    timer?: number
  },
) => {
  if (toastRef.value) {
    toastRef.value.toast(message, options);
  } else {
    console.warn('[toast] Toast is not ready yet.');
  }
};