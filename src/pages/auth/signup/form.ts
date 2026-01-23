import { computed, ref } from 'vue';

import { usePasswordValidation } from './validation';

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
    return (
      data.value.password.length > 0 &&
      data.value.confirm_password.length > 0 &&
      errors.value.password.length === 0
    );
  });

  const validateConfirmationPassword = () => {
    errors.value.confirm_password = [];
    if (data.value.confirm_password.length === 0) {
      return;
    }
    if (data.value.password !== data.value.confirm_password) {
      errors.value.confirm_password.push('Password do not match');
    }
  };

  const validatePassword = () => {
    const errorPassword = [];
    validateConfirmationPassword();
    if (data.value.password.length === 0) {
      return;
    }
    if (data.value.password.length < 8) {
      errorPassword.push('Use at least 8 characters');
    }
    if (!passwordValidation.containsUppercase(data.value.password)) {
      errorPassword.push('Contain at least one uppercase letter');
    }
    if (!passwordValidation.containsLowercase(data.value.password)) {
      errorPassword.push('Contain at least one lowercase letter');
    }
    if (!passwordValidation.containsNumber(data.value.password)) {
      errorPassword.push('Contain at least one numeric character');
    }
    if (!passwordValidation.containsSpecialChars(data.value.password)) {
      errorPassword.push('Contain at least one special character');
    }
    errors.value.password = errorPassword;
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
