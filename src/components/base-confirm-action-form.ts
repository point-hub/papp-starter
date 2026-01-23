import { reactive  } from 'vue';

export interface IForm {
  password?: string
  reason?: string
}

export interface IFormError {
  password: string[]
  reason: string[]
}

const createDefaultForm = (): IForm => ({
  password: '',
  reason: '',
});

const createDefaultFormError = (): IFormError => ({
  password: [],
  reason: [],
});


export function useForm() {
  const data = reactive<IForm>(createDefaultForm());
  const errors = reactive<IFormError>(createDefaultFormError());

  const reset = () => {
    Object.assign(data, createDefaultForm());
    Object.assign(errors, createDefaultFormError());
  };

  return { data, errors, reset };
}
