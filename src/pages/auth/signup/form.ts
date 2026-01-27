import { computed, ref } from 'vue';

import { usePasswordValidation } from '@/composables/password-validation';

export interface IForm {
  name: string
  username: string
  email: string
  password: string
  confirm_password: string
  accept_terms: boolean
}

export interface IFormError {
  name: string[]
  username: string[]
  email: string[]
  password: string[]
  confirm_password: string[]
  accept_terms: string[]
}

export function useForm() {
  const passwordValidation = usePasswordValidation();

  const defaultData: IForm = {
    name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    accept_terms: false,
  };

  const defaultErrors: IFormError = {
    name: [],
    username: [],
    email: [],
    password: [],
    confirm_password: [],
    accept_terms: [],
  };

  const data = ref<IForm>({ ...defaultData });
  const errors = ref<IFormError>({ ...defaultErrors });

  const reset = () => {
    data.value = { ...defaultData };
    errors.value = { ...defaultErrors };
  };

  const isPasswordConfirmed = computed(() => {
    if (!data.value.password || !data.value.confirm_password) {
      return false;
    }
    return (
      data.value.password.length > 0 &&
          data.value.confirm_password.length > 0 &&
          data.value.password && data.value.confirm_password &&
          errors.value.password.length === 0 &&
          errors.value.confirm_password.length === 0
    );
  });

  const validateConfirmationPassword = () => {
    errors.value.confirm_password = [];

    if (!data.value.confirm_password || data.value.confirm_password.length === 0) {
      return;
    }

    errors.value.confirm_password = passwordValidation.confirmed(data.value.password ?? '', data.value.confirm_password);
  };

  const validatePassword = () => {
    validateConfirmationPassword();

    if (!data.value.password || data.value.password.length === 0) {
      return;
    }

    errors.value.password = passwordValidation.validate(data.value.password);
  };

  return {
    data,
    errors,
    reset,
    isPasswordConfirmed,
    validateConfirmationPassword,
    validatePassword,
  };
}
