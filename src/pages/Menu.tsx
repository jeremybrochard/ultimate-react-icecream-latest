import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuCard from '../components/menu/MenuCard';
import MenuCardContent from '../components/menu/MenuCardContent';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import PageSection from '../components/structure/PageSection';
import { getMenu } from '../data/ice-cream-data';
import { MenuItem } from '../models/menu-item';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([] as MenuItem[]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async (isMounted: boolean) => {
    const data = await getMenu();
    if (isMounted) {
      setMenuItems([...data]);
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
    <PageSection title="Rock your taste buds with one of these!">
      <LoadingSpinner
        loadingMessage="Loading ice cream menu..."
        doneLoadingMessage="Done Loading menu."
        isLoading={isLoading}
      ></LoadingSpinner>
      {menuItems.length > 0 && (
        <ul className="container">
          {menuItems.map((item) => (
            <li key={item.id.toString()}>
              <MenuCard iceCream={item.iceCream}>
                <Link to={`/ice-creams/${item.id}`}>
                  <h3>{item.iceCream.name}</h3>
                </Link>
                <MenuCardContent menuItem={item}></MenuCardContent>
              </MenuCard>
            </li>
          ))}
        </ul>
      )}
    </PageSection>
  );
};

export default Menu;
