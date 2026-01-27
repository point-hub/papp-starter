import { computed, reactive } from 'vue';

import { usePasswordValidation } from './validation';

export interface IForm {
  current_password?: string
  new_password?: string
  password_confirmation?: string
}

export interface IFormError {
  current_password: string[]
  new_password: string[]
  password_confirmation: string[]
}

export function useForm() {
  const passwordValidation = usePasswordValidation();

  const createDefaultForm = (): IForm => ({
    current_password: undefined,
    new_password: undefined,
    password_confirmation: undefined,
  });

  const createDefaultFormError = (): IFormError => ({
    current_password: [],
    new_password: [],
    password_confirmation: [],
  });

  const data = reactive<IForm>(createDefaultForm());
  const errors = reactive<IFormError>(createDefaultFormError());

  const reset = () => {
    Object.assign(data, createDefaultForm());
    Object.assign(errors, createDefaultFormError());
  };

  const isPasswordConfirmed = computed(() => {
    if (!data.new_password || !data.password_confirmation) {
      return false;
    }
    return (
      data.new_password.length > 0 &&
        data.password_confirmation.length > 0 &&
        errors.new_password.length === 0
    );
  });

  const validateConfirmationPassword = () => {
    errors.password_confirmation = [];
    if (!data.password_confirmation || data.password_confirmation.length === 0) {
      return;
    }
    if (data.new_password !== data.password_confirmation) {
      errors.password_confirmation.push('Password do not match');
    }
  };

  const validatePassword = () => {
    const errorPassword = [];
    validateConfirmationPassword();
    if (!data.new_password || data.new_password.length === 0) {
      return;
    }
    if (data.new_password.length < 8) {
      errorPassword.push('Use at least 8 characters');
    }
    if (!passwordValidation.containsUppercase(data.new_password)) {
      errorPassword.push('Contain at least one uppercase letter');
    }
    if (!passwordValidation.containsLowercase(data.new_password)) {
      errorPassword.push('Contain at least one lowercase letter');
    }
    if (!passwordValidation.containsNumber(data.new_password)) {
      errorPassword.push('Contain at least one numeric character');
    }
    if (!passwordValidation.containsSpecialChars(data.new_password)) {
      errorPassword.push('Contain at least one special character');
    }
    errors.new_password = errorPassword;
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
