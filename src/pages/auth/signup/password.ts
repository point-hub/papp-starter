import { ref } from 'vue';

export function usePassword() {
  const type = ref<'text' | 'password'>('password');

  const toggle = () => {
    type.value = type.value === 'password' ? 'text' : 'password';
  };
  return { type: type, toggle };
}
