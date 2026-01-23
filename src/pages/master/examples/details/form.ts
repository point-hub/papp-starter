import { reactive } from 'vue';

export interface IForm {
  _id?: string
  code?: string
  name?: string
  composite_unique_1?: string
  composite_unique_2?: string
  age?: number
  gender?: string
  optional_unique?: string
  is_archived?: boolean
  notes?: string
}

export function useForm() {
  const defaultForm: IForm = {
    _id: undefined,
    code: undefined,
    name: undefined,
    composite_unique_1: undefined,
    composite_unique_2: undefined,
    age: undefined,
    gender: undefined,
    optional_unique: undefined,
    is_archived: undefined,
    notes: undefined,
  };

  const data = reactive<IForm>(defaultForm);

  return { data };
}
