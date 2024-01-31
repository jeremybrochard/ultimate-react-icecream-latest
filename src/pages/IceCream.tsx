import { useParams } from 'react-router-dom';
import { MenuItem } from '../models/menu-item';
import { useEffect, useState } from 'react';
import IceCreamImage from '../components/IceCreamImage';
import LoadingSpinner from '../components/LoadingSpinner';
import { getIceCream } from '../data/ice-cream-data';

const IceCream = () => {
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState(null as MenuItem | null);
  const [isLoading, setIsLoading] = useState(true);

  const loadIceCream = async (id: number): Promise<void> => {
    const menuItem = await getIceCream(id);
    if (menuItem) {
      setMenuItem({ ...menuItem });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadIceCream(+id);
    }
  }, [id]);

  const onFormValueChange = (event: any) => {
    if (!menuItem) {
      return;
    }
    let value = event.target.value;

    if (event.target.type === 'checkbox') {
      value = event.target.checked;
    }
    setMenuItem({
      ...menuItem,
      [event.target.name]: value,
    });
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
            <form>
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
                onChange={onFormValueChange}
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
                onChange={onFormValueChange}
              ></input>
              <div className="button-container">
                <button className="ok">Save</button>
                <button className="warning">Delete</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default IceCream;
