import { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { getMenu } from '../data/ice-cream-data';
import { MenuItem } from '../models/menu-item';
import LoadingSpinner from './LoadingSpinner';
import MenuCard from './MenuCard';

const Menu = () => {
  const [iceCreamsList, setIceCreamsList] = useState([] as MenuItem[]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async (isMounted: boolean) => {
    const data = await getMenu();
    if (isMounted) {
      setIceCreamsList([...data]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    loadData(isMounted);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>
          Rock your taste buds with one of these! | Ultimate Ice Cream
        </title>
      </Helmet>
      <h2 className="main-heading">Rock your taste buds with one of these!</h2>
      <LoadingSpinner isLoading={isLoading}></LoadingSpinner>
      {iceCreamsList.length > 0 && (
        <ul className="container">
          {iceCreamsList.map((iceCream) => (
            <li key={iceCream.id.toString()}>
              <MenuCard menuItem={iceCream}></MenuCard>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default Menu;
