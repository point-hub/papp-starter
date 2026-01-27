import { computed, reactive } from 'vue';

import { usePasswordValidation } from '@/composables/password-validation';

export interface IForm {
  email: string
  name: string
  username: string
  role_id: string
  notes: string
  password: string
  confirm_password: string
}

export interface IFormError {
  email: string[]
  name: string[]
  username: string[]
  role_id: string[]
  notes: string[]
  password: string[]
  confirm_password: string[]
}

export function useForm() {
  const passwordValidation = usePasswordValidation();
  const defaultForm: IForm = {
    email: '',
    name: '',
    username: '',
    role_id: '',
    notes: '',
    password: '',
    confirm_password: '',
  };

  const defaultFormError: IFormError = {
    email: [],
    name: [],
    username: [],
    role_id: [],
    notes: [],
    password: [],
    confirm_password: [],
  };

  const data = reactive<IForm>(defaultForm);
  const errors = reactive<IFormError>(defaultFormError);

  const reset = () => {
    Object.assign(data, defaultForm);
    Object.assign(errors, defaultFormError);
  };

  const isPasswordConfirmed = computed(() => {
    if (!data.password || !data.confirm_password) {
      return false;
    }
    return (
      data.password.length > 0 &&
          data.confirm_password.length > 0 &&
          data.password && data.confirm_password &&
          errors.password.length === 0 &&
          errors.confirm_password.length === 0
    );
  });

  const validateConfirmationPassword = () => {
    errors.confirm_password = [];

    if (!data.confirm_password || data.confirm_password.length === 0) {
      return;
    }

    errors.confirm_password = passwordValidation.confirmed(data.password ?? '', data.confirm_password);
  };

  const validatePassword = () => {
    validateConfirmationPassword();

    if (!data.password || data.password.length === 0) {
      return;
    }

    errors.password = passwordValidation.validate(data.password);
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
