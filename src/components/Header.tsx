import React from 'react';
import iceCreamImage from '../assets/img/ultimate-ice-cream.svg';
import Navbar from './Navbar';

const Header = () => (
  <header>
    <h1>
      <img src={iceCreamImage} alt=""></img>
      Ultimate Ice Cream
    </h1>
    <Navbar></Navbar>
  </header>
);

export default Header;
