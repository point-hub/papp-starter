import { reactive } from 'vue';

export interface IForm {
  name: string
  role_id: string
  notes: string
  update_reason: string
}

export interface IFormError {
  name: string[]
  role_id: string[]
  notes: string[]
  update_reason: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    name: '',
    role_id: '',
    notes: '',
    update_reason: '',
  };

  const defaultFormError: IFormError = {
    name: [],
    role_id: [],
    notes: [],
    update_reason: [],
  };

  const data = reactive<IForm>(defaultForm);
  const errors = reactive<IFormError>(defaultFormError);

  const reset = () => {
    Object.assign(data, defaultForm);
    Object.assign(errors, defaultFormError);
  };

  return { data, errors, reset };
}
