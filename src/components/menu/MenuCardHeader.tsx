import { Link } from 'react-router-dom';
import { IceCream } from '../../models/ice-cream';

export interface MenuCardHeaderParams {
  menuItemId?: number;
  iceCream: IceCream;
}

const MenuCardHeader = ({ menuItemId, iceCream }: MenuCardHeaderParams) => (
  <Link
    to={
      menuItemId
        ? `/ice-creams/${menuItemId}`
        : `/ice-creams/add?iceCreamId${iceCream.id}`
    }
  >
    <h3>{iceCream.name}</h3>
  </Link>
);

export default MenuCardHeader;
