import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IceCreamImage from '../components/IceCreamImage';
import LoadingSpinner from '../components/LoadingSpinner';
import { getMenuItem, updateMenuItem } from '../data/ice-cream-data';
import { MenuItem } from '../models/menu-item';

const IceCream = () => {
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState(null as MenuItem | null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadIceCream(+id);
    }
  }, [id]);

  const loadIceCream = async (id: number): Promise<void> => {
    const menuItem = await getMenuItem(id);
    if (menuItem) {
      setMenuItem({ ...menuItem });
      setIsLoading(false);
    }
  };

  const onFormValueChange = (
    event: any,
    type: 'string' | 'number' = 'string'
  ) => {
    if (!menuItem) {
      return;
    }
    let value = event.target.value;

    if (event.target.type === 'checkbox') {
      value = event.target.checked;
    }
    setMenuItem({
      ...menuItem,
      [event.target.name]: type === 'string' ? value : +value,
    });
  };

  const onFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(menuItem);
    setIsLoading(true);
    if (menuItem) {
      const updatedIceCream = await updateMenuItem(menuItem);
      setMenuItem({ ...updatedIceCream });
      setIsLoading(false);
    }
  };

  return (
    <section>
      <h2 className="main-heading">Update this beauty</h2>
      <LoadingSpinner isLoading={isLoading}></LoadingSpinner>
      {menuItem && (
        <div className="form-frame">
          <div className="image-container">
            <IceCreamImage iceCreamId={menuItem.iceCream.id}></IceCreamImage>
          </div>
          <div className="form-container">
            <form onSubmit={onFormSubmit}>
              <label htmlFor="iceCreamName">Name :</label>
              <span id="iceCreamName" className="">
                {menuItem.iceCream.name}
              </span>
              <label htmlFor="description">Description* :</label>
              <textarea
                id="description"
                name="description"
                value={menuItem.description}
                onChange={onFormValueChange}
              ></textarea>
              <label htmlFor="inStock">In Stock :</label>
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="inStock"
                  name="inStock"
                  checked={menuItem.inStock}
                  onChange={onFormValueChange}
                ></input>
                <div className="checkbox-wrapper-checked"></div>
              </div>
              <label htmlFor="quantity">Quantity :</label>
              <select
                id="quantity"
                name="quantity"
                value={menuItem.quantity}
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
                value={menuItem.price}
                onChange={(event) => onFormValueChange(event, 'number')}
              ></input>
              <div className="button-container">
                <button className="ok" type="submit">
                  Save
                </button>
                <button className="warning" type="button">
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default IceCream;
