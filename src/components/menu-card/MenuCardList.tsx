import React, { ReactNode } from 'react';

const MenuCardList = ({ children }: { children: ReactNode[] }) => {
  return (
    <ul className="container">
      {React.Children.map(children, (card) => (
        <li>{card}</li>
      ))}
    </ul>
  );
};

export default MenuCardList;
