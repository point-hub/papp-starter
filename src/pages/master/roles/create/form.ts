import { reactive } from 'vue';

export interface IForm {
  code?: string
  name?: string
  notes?: string
  permissions?: string[]
}

export interface IFormError {
  code: string[]
  name: string[]
  notes: string[]
  permissions: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    code: undefined,
    name: undefined,
    notes: undefined,
    permissions: undefined,
  };

  const defaultFormError: IFormError = {
    code: [],
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
