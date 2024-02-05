import { FormEvent, ReactNode, useState } from 'react';
import IceCreamImage from './IceCreamImage';
import { MenuItem } from '../../models/menu-item';
import { IceCream } from '../../models/ice-cream';
import '../../styles/form-spacer.scss';
import { useUniqueIds } from '../../hooks/useUniqueIds';

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

  const [descriptionId, inStockId, quantityId, priceId] = useUniqueIds(4);

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
    onFormSubmit({ ...formState});
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
        <form onSubmit={submitForm}>
          <label htmlFor={descriptionId}>Description* :</label>
          <textarea
            id={descriptionId}
            name="description"
            value={formState.description}
            onChange={onFormValueChange}
          ></textarea>
          <label htmlFor={inStockId}>In Stock :</label>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id={inStockId}
              name="inStock"
              checked={formState.inStock}
              onChange={onFormValueChange}
            ></input>
            <div className="checkbox-wrapper-checked"></div>
          </div>
          <label htmlFor={quantityId}>Quantity :</label>
          <select
            id={quantityId}
            name="quantity"
            value={formState.quantity}
            onChange={(event) => onFormValueChange(event, 'number')}
          >
            <option value="0">0</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
          <label htmlFor={priceId}>Price* :</label>
          <input
            id={priceId}
            name="price"
            type="number"
            step="0.01"
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
