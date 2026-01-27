import { computed, ref } from 'vue';

import { usePasswordValidation } from '@/composables/password-validation';

export interface IForm {
  password: string
  confirm_password: string
}

export interface IFormError {
  password: string[]
  confirm_password: string[]
}

export function useForm() {
  const passwordValidation = usePasswordValidation();

  const defaultData: IForm = {
    password: '',
    confirm_password: '',
  };

  const defaultErrors: IFormError = {
    password: [],
    confirm_password: [],
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
