import { reactive } from 'vue';

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

  return { data, errors, reset };
}
