import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(
  error: ValidationError,
  setError: any,
): Errors {
  const validationErrors: Errors = {};

  error.inner?.forEach((err) => {
    setError(err.path!, { message: err.message });
    validationErrors[err.path!] = err.message;
  });

  return validationErrors;
}
