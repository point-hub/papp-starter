import { reactive } from 'vue';

export interface IForm {
  _id?: string
  code?: string
  name?: string
  is_archived?: boolean
  permissions?: string[]
  notes?: string
}

export function useForm() {
  const defaultForm: IForm = {
    _id: undefined,
    code: undefined,
    name: undefined,
    is_archived: undefined,
    permissions: undefined,
    notes: undefined,
  };

  const data = reactive<IForm>(defaultForm);

  return { data };
}
