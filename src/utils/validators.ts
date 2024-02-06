export type ValidationFn = (value: any, compareValue?: any) => string | null;

export const validateDescription: ValidationFn = (
  description: string
): string | null => {
  return description.trim() ? null : 'You must enter a description';
};

export const validateQuantity: ValidationFn = (
  quantity: string,
  inStock: boolean
): string | null => {
  return inStock && !quantity
    ? 'An in stock item should have a quantity'
    : null;
};

export const validatePrice: ValidationFn = (price: string): string | null => {
  const regex = /[0-9][.]{1}[0-9]{2}/;

  if (!price || price === '0.00') {
    return 'You must enter a price';
  }

  if (!regex.test(price)) {
    return 'Please enter a valid price';
  }

  return null;
};
