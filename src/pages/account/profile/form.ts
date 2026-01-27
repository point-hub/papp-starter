import { reactive } from 'vue';

export interface IForm {
  name: string
}

export interface IFormError {
  name: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    name: '',
  };

  const defaultFormError: IFormError = {
    name: [],
  };

  const data = reactive<IForm>(defaultForm);
  const errors = reactive<IFormError>(defaultFormError);

  const reset = () => {
    Object.assign(data, defaultForm);
    Object.assign(errors, defaultFormError);
  };

  return { data, errors, reset };
}
