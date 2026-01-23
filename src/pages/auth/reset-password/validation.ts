export function usePasswordValidation() {
  const containsUppercase = (value: string) => {
    return /[A-Z]/.test(value);
  };

  const containsLowercase = (value: string) => {
    return /[a-z]/.test(value);
  };

  const containsNumber = (value: string) => {
    // The \d character matches any digit from 0 to 9.
    return /\d/.test(value);
  };

  function containsSpecialChars(value: string) {
    const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    return specialChars.test(value);
  }

  return { containsUppercase, containsLowercase, containsNumber, containsSpecialChars };
}
