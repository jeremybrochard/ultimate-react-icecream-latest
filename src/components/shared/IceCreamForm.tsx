import { FormEvent, ReactNode, useState } from 'react';
import IceCreamImage from './IceCreamImage';
import { MenuItem } from '../../models/menu-item';
import { IceCream } from '../../models/ice-cream';

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

  const onFormValueChange = (
    event: any,
    type: 'string' | 'number' = 'string'
  ) => {
    if (!formState) {
      return;
    }
    let value = event.target.value;

    if (event.target.type === 'checkbox') {
      value = event.target.checked;
    }
    setFormState({
      ...formState,
      [event.target.name]: type === 'string' ? value : +value,
    });
  };

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    onFormSubmit(formState);
  };

  return (
    <div className="form-frame">
      <div className="image-container">
        <IceCreamImage iceCreamId={iceCream.id}></IceCreamImage>
      </div>
      <div className="form-container">
        <form onSubmit={submitForm}>
          <label htmlFor="iceCreamName">Name :</label>
          <input id="iceCreamName" readOnly value={iceCream.name}></input>
          <label htmlFor="description">Description* :</label>
          <textarea
            id="description"
            name="description"
            value={formState.description}
            onChange={onFormValueChange}
          ></textarea>
          <label htmlFor="inStock">In Stock :</label>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="inStock"
              name="inStock"
              checked={formState.inStock}
              onChange={onFormValueChange}
            ></input>
            <div className="checkbox-wrapper-checked"></div>
          </div>
          <label htmlFor="quantity">Quantity :</label>
          <select
            id="quantity"
            name="quantity"
            value={formState.quantity}
            onChange={(event) => onFormValueChange(event, 'number')}
          >
            <option>0</option>
            <option>10</option>
            <option>20</option>
            <option>30</option>
            <option>40</option>
            <option>50</option>
          </select>
          <label htmlFor="price">Price* :</label>
          <input
            id="price"
            name="price"
            value={formState.price}
            onChange={(event) => onFormValueChange(event, 'number')}
          ></input>
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
