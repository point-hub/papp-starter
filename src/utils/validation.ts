export function validateRequiredFields<T extends Record<string, any>>(
  data: T,
  requiredFields: (keyof T)[],
  errors: Record<keyof T, string[]>
): boolean {
  let hasError = false;

  requiredFields.forEach((field) => {
    const value = data[field];

    const isEmpty =
      value === null ||
      value === undefined ||
      value === '' ||
      (typeof value === 'boolean' && value === false);

    if (isEmpty) {
      errors[field] = [`The ${String(field)} field is required.`];
      hasError = true;
    } else {
      errors[field] = [];
    }
  });

  return !hasError;
}