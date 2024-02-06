import { FormEvent, ReactNode, useState } from 'react';
import { useUniqueIds } from '../../hooks/useUniqueIds';
import { IceCream } from '../../models/ice-cream';
import { MenuItem } from '../../models/menu-item';
import IceCreamImage from './IceCreamImage';
import useValidation from '../../hooks/useValidation';
import {
  validateDescription,
  validatePrice,
  validateQuantity,
} from '../../utils/validators';
import ErrorContainer from './ErrorContainer';

export interface FormState {
  description: string;
  inStock: boolean;
  quantity: number;
  price: number;
}

const INITIAL_FORM_STATE = {
  description: '',
  inStock: false,
  quantity: 0,
  price: 0,
};

const setFormInitialState = ({
  inStock,
  quantity,
  price,
  description,
}: MenuItem): FormState => {
  return {
    description,
    inStock,
    price,
    quantity,
  };
};

const IceCreamForm = ({
  iceCream,
  initialState = null,
  onFormSubmit,
  additionalButtons,
}: {
  iceCream: IceCream;
  initialState?: MenuItem | null;
  onFormSubmit: (formState: FormState) => void;
  additionalButtons?: ReactNode | ReactNode[];
}) => {
  const [formState, setFormState] = useState(
    initialState ? setFormInitialState(initialState) : INITIAL_FORM_STATE
  );
  const [hasFormBeingSubmitted, setHasFormBeingSubmitted] = useState(false);
  const [
    descriptionId,
    descriptionErrorId,
    inStockId,
    quantityId,
    quantityErrorId,
    priceId,
    priceErrorId,
  ] = useUniqueIds(7);

  const [descriptionError, descriptionErrorProps] = useValidation({
    isRequired: true,
    errorId: descriptionErrorId,
    validateFn: validateDescription,
    value: formState.description,
    showError: hasFormBeingSubmitted,
  });
  const [quantityError, quantityErrorProps] = useValidation({
    isRequired: true,
    errorId: quantityErrorId,
    validateFn: validateQuantity,
    value: formState.quantity,
    compareValue: formState.inStock,
    showError: hasFormBeingSubmitted,
  });
  const [priceError, priceErrorProps] = useValidation({
    isRequired: true,
    errorId: priceErrorId,
    validateFn: validatePrice,
    value: formState.price,
    showError: hasFormBeingSubmitted,
  });

  const onInStockValueChange = (event: any) => {
    const inStock = event.target.checked;
    setFormState({
      ...formState,
      inStock,
      quantity: !inStock ? 0 : formState.quantity,
    });
  };

  const onQuantityValueChange = (event: any) => {
    const quantity = +event.target.value;
    setFormState({
      ...formState,
      quantity,
      inStock: quantity !== 0,
    });
  };

  const onFormValueChange = (
    event: any,
    type: 'string' | 'number' = 'string'
  ) => {
    if (!formState) {
      return;
    }
    let value = event.target.value;

    setFormState({
      ...formState,
      [event.target.name]: type === 'string' ? value : +value,
    });
  };

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    setHasFormBeingSubmitted(true);

    if (descriptionError || quantityError || priceError) {
      return;
    }

    onFormSubmit({ ...formState });
  };

  return (
    <div className="form-frame">
      <div className="image-container">
        <IceCreamImage iceCreamId={iceCream.id}></IceCreamImage>
      </div>
      <div className="form-container">
        <dl>
          <dt>Name :</dt>
          <dd>{iceCream.name}</dd>
        </dl>
        <form onSubmit={submitForm} noValidate>
          <label htmlFor={descriptionId}>
            Description<span aria-hidden="true">*</span> :
          </label>
          <ErrorContainer
            errorMessage={descriptionError}
            showError={hasFormBeingSubmitted}
            errorId={descriptionErrorId}
          >
            <textarea
              id={descriptionId}
              name="description"
              value={formState.description}
              onChange={onFormValueChange}
              {...descriptionErrorProps as any}
            ></textarea>
          </ErrorContainer>
          <label htmlFor={inStockId}>In Stock :</label>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id={inStockId}
              name="inStock"
              checked={formState.inStock}
              onChange={onInStockValueChange}
            ></input>
            <div className="checkbox-wrapper-checked"></div>
          </div>
          <label htmlFor={quantityId}>Quantity :</label>
          <ErrorContainer
            errorMessage={quantityError}
            showError={hasFormBeingSubmitted}
            errorId={quantityErrorId}
          >
            <select
              id={quantityId}
              name="quantity"
              value={formState.quantity}
              onChange={onQuantityValueChange}
              {...quantityErrorProps as any}
            >
              <option value="0">0</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </ErrorContainer>
          <label htmlFor={priceId}>
            Price<span aria-hidden="true">*</span> :
          </label>
          <ErrorContainer
            errorMessage={priceError}
            showError={hasFormBeingSubmitted}
            errorId={priceErrorId}
          >
            <input
              id={priceId}
              name="price"
              type="number"
              step="0.01"
              value={formState.price}
              onChange={(event) => onFormValueChange(event, 'number')}
              {...priceErrorProps as any}
            ></input>
          </ErrorContainer>
          <div className="button-container">
            <button className="ok" type="submit">
              Save
            </button>
            {additionalButtons}
          </div>
        </form>
      </div>
    </div>
  );
};

export default IceCreamForm;
