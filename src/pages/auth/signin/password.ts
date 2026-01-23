import { ref } from 'vue';

export function usePassword() {
  const type = ref<'text' | 'password'>('password');

  const toggle = () => {
    if (type.value === 'password') {
      type.value = 'text';
    } else {
      type.value = 'password';
    }
  };

  return { type, toggle };
}
