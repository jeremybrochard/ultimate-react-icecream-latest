import { Link } from 'react-router-dom';

export interface MenuCardHeaderParams {
  id: number;
  iceCreamName: string;
  action: 'add' | 'edit';
}

const MenuCardHeader = ({ id, iceCreamName, action }: MenuCardHeaderParams) => (
  <Link
    to={
      action === 'edit'
        ? `/ice-creams/${id}`
        : `/ice-creams/add?iceCreamId${id}`
    }
  >
    <h3>{iceCreamName}</h3>
  </Link>
);

export default MenuCardHeader;
