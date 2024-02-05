import { MouseEventHandler } from 'react';
import { IceCream } from '../../models/ice-cream';
import IceCreamImage from '../shared/IceCreamImage';

export interface MenuCardParams {
  iceCream: IceCream;
  children: React.ReactNode | React.ReactNode[];
  onClick?: MouseEventHandler;
}

const MenuCard = ({ iceCream, children, onClick }: MenuCardParams) => {
  return (
    <section className="card" onClick={onClick}>
      <div className="image-container">
        <IceCreamImage iceCreamId={iceCream.id} />
      </div>
      <div className="text-container">{children}</div>
    </section>
  );
};

export default MenuCard;
