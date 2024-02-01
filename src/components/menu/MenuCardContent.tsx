import { MenuItem } from '../../models/menu-item';

const MenuCardContent = ({ menuItem }: { menuItem: MenuItem }) =>
  menuItem && menuItem.id ? (
    <div className="card-content">
      <p className="price">${menuItem.price.toFixed(2)}</p>
      {menuItem.inStock ? (
        <p className="stock">{menuItem.quantity} in stock</p>
      ) : (
        <p className="stock out">Currently out of stock</p>
      )}
      <p className="description">{menuItem.description}</p>
    </div>
  ) : null;

export default MenuCardContent;
