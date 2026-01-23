import { reactive } from 'vue';

export interface IForm {
  code?: string
  name?: string
  composite_unique_1?: string
  composite_unique_2?: string
  age?: number
  gender?: string
  optional_unique?: string
  notes?: string
  // audit log
  update_reason?: string
}

export interface IFormError {
  code?: string[]
  name?: string[]
  composite_unique_1?: string[]
  composite_unique_2?: string[]
  age?: string[]
  gender?: string[]
  optional_unique?: string[]
  notes?: string[]
  // audit log
  update_reason?: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    code: undefined,
    name: undefined,
    composite_unique_1: undefined,
    composite_unique_2: undefined,
    age: undefined,
    gender: undefined,
    optional_unique: undefined,
    notes: undefined,
    update_reason: undefined,
  };

  const defaultFormError: IFormError = {
    code: [],
    name: [],
    composite_unique_1: [],
    composite_unique_2: [],
    age: [],
    gender: [],
    optional_unique: [],
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
