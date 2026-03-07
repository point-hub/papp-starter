import { reactive } from 'vue';

export interface IForm {
  name?: string
  notes?: string
  permissions?: string[]
}

export interface IFormError {
  name: string[]
  notes: string[]
  permissions: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    name: undefined,
    notes: undefined,
    permissions: undefined,
  };

  const defaultFormError: IFormError = {
    name: [],
    notes: [],
    permissions: [],
  };

  const data = reactive<IForm>(defaultForm);
  const errors = reactive<IFormError>(defaultFormError);

  const reset = () => {
    Object.assign(data, defaultForm);
    Object.assign(errors, defaultFormError);
  };

  return { data, errors, reset };
}
