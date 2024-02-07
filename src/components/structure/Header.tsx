import { NavLink } from 'react-router-dom';
import iceCreamImage from '../../assets/img/ultimate-ice-cream.svg';

const NAVBAR_ITEMS = [
  {
    title: 'Menu',
    path: '/',
    state: {
      focus: true,
    },
  },
  {
    title: 'Add Ice Cream',
    path: '/ice-creams',
    state: {
      focus: true,
    },
  },
];

const Header = () => (
  <header>
    <h1>
      <img src={iceCreamImage} alt=""></img>
      Ultimate Ice Cream
    </h1>
    <nav>
      {NAVBAR_ITEMS.map(({ title, path, state }) => (
        <NavLink key={path} to={path} state={state}>
          {title}
        </NavLink>
      ))}
    </nav>
  </header>
);

export default Header;
