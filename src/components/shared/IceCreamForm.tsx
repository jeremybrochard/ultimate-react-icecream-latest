import { FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { useUniqueIds } from '../../hooks/useUniqueIds';
import useValidation from '../../hooks/useValidation';
import { IceCream } from '../../models/ice-cream';
import { IceCreamFormState } from '../../models/ice-cream-form-state';
import { MenuItem } from '../../models/menu-item';
import {
  validateDescription,
  validatePrice,
  validateQuantity,
} from '../../utils/validators';
import ErrorContainer from './ErrorContainer';
import IceCreamImage from './IceCreamImage';

export interface IceCreamFormParams {
  iceCream: IceCream;
  initialState?: MenuItem | null;
  onFormSubmit: (formState: IceCreamFormState) => void;
  additionalButtons?: ReactNode | ReactNode[];
}

const IceCreamForm = ({
  iceCream,
  initialState = null,
  onFormSubmit,
  additionalButtons,
}: IceCreamFormParams) => {
  const [formState, setFormState] = useState({
    description: '',
    inStock: false,
    quantity: 0,
    price: 0,
  });
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

  const descriptionRef = useRef(null as HTMLElement | null);
  const quantityRef = useRef(null as HTMLElement | null);
  const priceRef = useRef(null as HTMLElement | null);

  useEffect(() => {
    if (initialState) {
      setFormState({
        description: initialState.description,
        inStock: initialState.inStock,
        price: initialState.price,
        quantity: initialState.quantity,
      });
    }
  }, [initialState]);

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
      if (descriptionError) {
        descriptionRef.current?.focus();
      }

      if (quantityError) {
        quantityRef.current?.focus();
      }

      if (priceError) {
        priceRef.current?.focus();
      }

      // Use of timeout to focus first error <- kept as example
      // setTimeout(() => {
      //   if (formRef && formRef.current) {
      //     const element = formRef.current.querySelector(
      //       '[aria-invalid="true"]'
      //     ) as HTMLElement;
      //     console.log(element, formRef);
      //     if (element) {
      //       element.focus();
      //     }
      //   }
      // });
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
              ref={descriptionRef}
              id={descriptionId}
              name="description"
              value={formState.description}
              onChange={onFormValueChange}
              {...(descriptionErrorProps as any)}
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
              ref={quantityRef}
              id={quantityId}
              name="quantity"
              value={formState.quantity}
              onChange={onQuantityValueChange}
              {...(quantityErrorProps as any)}
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
              ref={priceRef}
              id={priceId}
              name="price"
              type="number"
              step="0.01"
              value={formState.price}
              onChange={(event) => onFormValueChange(event, 'number')}
              {...(priceErrorProps as any)}
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
