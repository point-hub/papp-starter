import { ref } from 'vue';

interface IForm {
  code: string
}

interface IFormError {
  code: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    code: '',
  };

  const defaultFormError: IFormError = {
    code: [],
  };

  const data = ref<IForm>({ ...defaultForm });

  const errors = ref<IFormError>({ ...defaultFormError });

  const reset = () => {
    data.value = { ...defaultForm };
    errors.value = { ...defaultFormError };
  };

  return { data, errors, reset };
}
