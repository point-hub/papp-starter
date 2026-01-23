import { reactive } from 'vue';

export interface IForm {
  email: string
  name: string
  username: string
  role_id: string
  notes: string
  update_reason: string
  is_archived: boolean
}

export interface IFormError {
  email: string[]
  name: string[]
  username: string[]
  role_id: string[]
  notes: string[]
  update_reason: string[]
  is_archived: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    email: '',
    name: '',
    username: '',
    role_id: '',
    notes: '',
    update_reason: '',
    is_archived: false,
  };

  const defaultFormError: IFormError = {
    email: [],
    name: [],
    username: [],
    role_id: [],
    notes: [],
    update_reason: [],
    is_archived: [],
  };

  const data = reactive<IForm>(defaultForm);
  const errors = reactive<IFormError>(defaultFormError);

  const reset = () => {
    Object.assign(data, defaultForm);
    Object.assign(errors, defaultFormError);
  };

  return { data, errors, reset };
}
