import React, { useEffect, useState } from 'react';
import { MenuItem } from '../models/menu-item';
import axios from 'axios';

const Menu = () => {
  const [iceCreamsList, setIceCreamsList] = useState([] as MenuItem[]);

  const loadData = async() => {
    const { data } = await axios.get('/api/menu');
    setIceCreamsList([ ...data]);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <section>
      <h2 className="main-heading">Rock your taste buds with one of these!</h2>
      <ul>
        {iceCreamsList.map(({ id, description }) => (
          <li key={id}>{description}</li>
        ))}
      </ul>
    </section>
  );
};

export default Menu;
