import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAVBAR_ITEMS = [
  {
    title: 'Menu',
    path: '/',
  },
  {
    title: 'Add Ice Cream',
    path: '/new-ice-cream',
  },
];

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav>
      {NAVBAR_ITEMS.map(({ title, path }) => (
        <Link
          key={path}
          to={path}
          className={pathname === path ? 'active' : ''}
        >
          {title}
        </Link>
      ))}
    </nav>
  );
};
export default Navbar;
