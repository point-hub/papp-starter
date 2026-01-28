import { ref } from 'vue';

export interface IForm {
  username: string
  password: string
  remember_me: boolean
}

export interface IFormError {
  username: string[]
  password: string[]
  remember_me: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    username: '',
    password: '',
    remember_me: false,
  };

  const defaultFormError: IFormError = {
    username: [],
    password: [],
    remember_me: [],
  };

  const data = ref<IForm>(defaultForm);

  const errors = ref<IFormError>(defaultFormError);

  const reset = () => {
    data.value = defaultForm;
    errors.value = defaultFormError;
  };

  return { data, errors, reset };
}
