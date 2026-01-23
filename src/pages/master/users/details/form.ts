import { reactive } from 'vue';

export interface IForm {
  _id: string
  email: string
  name: string
  username: string
  notes: string
  is_archived: boolean
  role: {
    _id: string
    code: string
    name: string
    permissions: string[]
  }
}

export function useForm() {
  const defaultForm: IForm = {
    _id: '',
    email: '',
    name: '',
    username: '',
    notes: '',
    is_archived: false,
    role: {
      _id: '',
      code: '',
      name: '',
      permissions: [],
    },
  };

  const data = reactive<IForm>(defaultForm);

  const reset = () => {
    Object.assign(data, defaultForm);
  };

  return { data, reset };
}
