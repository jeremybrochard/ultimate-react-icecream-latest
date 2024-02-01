import { Link } from 'react-router-dom';
import { MenuItem } from '../../models/menu-item';
import IceCreamImage from '../shared/IceCreamImage';

const MenuCard = ({ menuItem }: { menuItem: MenuItem }) => {
  return (
    <section className="card">
      <div className="image-container">
        <IceCreamImage iceCreamId={menuItem.iceCream.id} />
      </div>
      <div className="text-container">
        <Link to={`/ice-creams/${menuItem.id}`}>
          <h3>{menuItem.iceCream.name}</h3>
        </Link>
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
    </section>
  );
};

export default MenuCard;
