import iceCreamImage from '../../assets/img/ultimate-ice-cream.svg';
import Navbar from './Navbar';

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
    <Navbar links={NAVBAR_ITEMS}></Navbar>
  </header>
);

export default Header;
