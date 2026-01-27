import { computed, reactive } from 'vue';

import { usePasswordValidation } from '@/composables/password-validation';

export interface IForm {
  current_password?: string
  new_password?: string
  confirm_password?: string
}

export interface IFormError {
  current_password: string[]
  new_password: string[]
  confirm_password: string[]
}

export function useForm() {
  const passwordValidation = usePasswordValidation();

  const createDefaultForm = (): IForm => ({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });

  const createDefaultFormError = (): IFormError => ({
    current_password: [],
    new_password: [],
    confirm_password: [],
  });

  const data = reactive<IForm>(createDefaultForm());
  const errors = reactive<IFormError>(createDefaultFormError());

  const reset = () => {
    Object.assign(data, createDefaultForm());
    Object.assign(errors, createDefaultFormError());
  };

  const isPasswordConfirmed = computed(() => {
    if (!data.new_password || !data.confirm_password) {
      return false;
    }
    return (
      data.new_password.length > 0 &&
        data.confirm_password.length > 0 &&
        data.new_password && data.confirm_password &&
        errors.new_password.length === 0 &&
        errors.confirm_password.length === 0
    );
  });

  const validateConfirmationPassword = () => {
    errors.confirm_password = [];

    if (!data.confirm_password || data.confirm_password.length === 0) {
      return;
    }

    errors.confirm_password = passwordValidation.confirmed(data.new_password ?? '', data.confirm_password);
  };

  const validatePassword = () => {
    validateConfirmationPassword();

    if (!data.new_password || data.new_password.length === 0) {
      return;
    }

    errors.new_password = passwordValidation.validate(data.new_password);
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
