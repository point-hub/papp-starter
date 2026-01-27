import { reactive } from 'vue';

export interface IForm {
  username: string
}

export interface IFormError {
  username: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    username: '',
  };

  const defaultFormError: IFormError = {
    username: [],
  };

  const data = reactive<IForm>(defaultForm);
  const errors = reactive<IFormError>(defaultFormError);

  const reset = () => {
    Object.assign(data, defaultForm);
    Object.assign(errors, defaultFormError);
  };

  return { data, errors, reset };
}
