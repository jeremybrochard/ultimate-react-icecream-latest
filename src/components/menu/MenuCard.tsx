import { MenuItem } from '../../models/menu-item';
import IceCreamImage from '../shared/IceCreamImage';
import MenuCardContent from './MenuCardContent';
import MenuCardHeader from './MenuCardHeader';

const MenuCard = ({ menuItem }: { menuItem: MenuItem }) => {
  return (
    <section className="card">
      <div className="image-container">
        <IceCreamImage iceCreamId={menuItem.iceCream.id} />
      </div>
      <div className="text-container">
        <MenuCardHeader menuItemId={menuItem.id} iceCream={menuItem.iceCream} />
        <MenuCardContent menuItem={menuItem} />
      </div>
    </section>
  );
};

export default MenuCard;
