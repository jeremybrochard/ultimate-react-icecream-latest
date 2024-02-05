import { useEffect, useState } from 'react';
import { ValidationFn, ValidationResult } from '../utils/validators';

const useValidation = (
  value: any,
  validateFn: ValidationFn,
  compareValue = null as any
): string | null => {
  const [validateResult, setValidateResult] = useState(
    null as ValidationResult
  );

  useEffect(() => {
    setValidateResult(validateFn(value, compareValue));
  }, [value, validateFn, compareValue]);

  return validateResult;
};

export default useValidation;
