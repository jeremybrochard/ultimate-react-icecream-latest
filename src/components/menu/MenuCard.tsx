import { IceCream } from '../../models/ice-cream';
import IceCreamImage from '../shared/IceCreamImage';

export interface MenuCardParams {
  iceCream: IceCream;
  children: React.ReactNode | React.ReactNode[];
}

const MenuCard = ({ iceCream, children }: MenuCardParams) => {
  return (
    <section className="card">
      <div className="image-container">
        <IceCreamImage iceCreamId={iceCream.id} />
      </div>
      <div className="text-container">{children}</div>
    </section>
  );
};

export default MenuCard;
