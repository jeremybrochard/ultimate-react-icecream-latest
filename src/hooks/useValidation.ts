import { useEffect, useState } from 'react';
import { ValidationFn } from '../utils/validators';

export interface ValidationParams {
  value: any;
  compareValue?: any;
  validateFn: ValidationFn;
  errorId: string;
  showError: boolean;
  isRequired: boolean;
}

export type ValidationResult = [
  string | null,
  {
    'aria-describedby': string | null;
    'aria-invalid': 'true' | 'false';
    'aria-required': 'true' | null;
    required: boolean;
  },
];

const useValidation = (params: ValidationParams): ValidationResult => {
  const { value, validateFn, compareValue, errorId, showError, isRequired } = params;
  const [error, setError] = useState(null as string | null);

  useEffect(() => {
    setError(validateFn(value, compareValue));
  }, [value, validateFn, compareValue]);

  return [
    error,
    {
      'aria-describedby': error && showError ? errorId : null,
      'aria-invalid': error && showError ? 'true' : 'false',
      'aria-required': isRequired ? 'true' : null,
      required: isRequired,
    },
  ];
};

export default useValidation;
