import { MouseEventHandler } from 'react';
import { IceCream } from '../../models/ice-cream';
import IceCreamImage from '../shared/IceCreamImage';
import { Link } from 'react-router-dom';

export interface MenuCardParams {
  iceCream: IceCream;
  children?: React.ReactNode | React.ReactNode[];
  onClick?: MouseEventHandler;
  linkTo: string;
}

const MenuCard = ({ iceCream, children, onClick, linkTo }: MenuCardParams) => {
  return (
    <section className="card" onClick={onClick}>
      <div className="image-container">
        <IceCreamImage iceCreamId={iceCream.id} />
      </div>
      <div className="text-container">
        <h3>
          <Link
            to={linkTo}
            state={{ focus: true }}
            onClick={(event) => event.stopPropagation()}
          >
            {iceCream.name}
          </Link>
        </h3>
        {children}
      </div>
    </section>
  );
};

export default MenuCard;
