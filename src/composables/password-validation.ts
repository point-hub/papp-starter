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

  function validate(password: string): string[] {
    const errorPassword = [];
    if (password.length < 8) {
      errorPassword.push('Use at least 8 characters');
    }
    if (!containsUppercase(password)) {
      errorPassword.push('Contain at least one uppercase letter');
    }
    if (!containsLowercase(password)) {
      errorPassword.push('Contain at least one lowercase letter');
    }
    if (!containsNumber(password)) {
      errorPassword.push('Contain at least one numeric character');
    }
    if (!containsSpecialChars(password)) {
      errorPassword.push('Contain at least one special character');
    }
    return errorPassword;
  }

  function confirmed(password: string, password_confirmation: string) {
    if (password !== password_confirmation) {
      return ['Password do not match'];
    }

    return [];
  }

  return { containsUppercase, containsLowercase, containsNumber, containsSpecialChars, validate, confirmed };
}
