import { ref } from 'vue';

interface IForm {
  email: string
}

interface IFormError {
  email: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    email: '',
  };

  const defaultFormError: IFormError = {
    email: [],
  };

  const data = ref<IForm>(defaultForm);

  const errors = ref<IFormError>(defaultFormError);

  const reset = () => {
    data.value = defaultForm;
    errors.value = defaultFormError;
  };

  return { data, errors, reset };
}
