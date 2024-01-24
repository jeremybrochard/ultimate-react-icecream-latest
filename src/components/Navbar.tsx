import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <Link to="/">Menu</Link>
    <Link to="/new">Add Ice Cream</Link>
  </nav>
);

export default Navbar;
