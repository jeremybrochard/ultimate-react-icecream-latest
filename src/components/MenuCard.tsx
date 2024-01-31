import { Link } from 'react-router-dom';
import { MenuItem } from '../models/menu-item';
import IceCreamImage from './IceCreamImage';

const MenuCard = ({ menuItem }: { menuItem: MenuItem }) => {
  return (
    <section className="card">
      <Link to={`/ice-creams/${menuItem.id}`}>
        <div className="image-container">
          <IceCreamImage iceCreamId={menuItem.iceCream.id} />
        </div>
        <div className="text-container">
          <h3>{menuItem.iceCream.name}</h3>
          <div className="card-content">
            <p className="price">${menuItem.price.toFixed(2)}</p>
            {menuItem.inStock ? (
              <p className="stock">{menuItem.quantity} in stock</p>
            ) : (
              <p className="stock out">Currently out of stock</p>
            )}
            <p className="description">{menuItem.description}</p>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default MenuCard;