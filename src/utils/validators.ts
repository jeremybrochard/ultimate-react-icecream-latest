export type ValidationFn = (
  value: any,
  compareValue?: any
) => ValidationResult;

export type ValidationResult = string | null;

export const validateDescription: ValidationFn = (
  description: string
): ValidationResult => {
  return description ? null : 'You must enter a description';
};

export const validateQuantity: ValidationFn = (
  quantity: string,
  inStock: boolean
): ValidationResult => {
  return inStock && !quantity
    ? 'An in stock item should have a quantity'
    : null;
};

export const validatePrice: ValidationFn = (
  price: string
): ValidationResult => {
  const regex = /[0-9][.]{1}[0-9]{2}/;

  if (!price || price === '0.00') {
    return 'You must enter a price';
  }

  if (!regex.test(price)) {
    return 'Please enter a valid price';
  }

  return null;
};
