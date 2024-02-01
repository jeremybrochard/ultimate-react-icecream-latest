import { useEffect, useState } from 'react';
import MenuCard from '../components/menu/MenuCard';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import PageSection from '../components/structure/PageSection';
import { getMenu } from '../data/ice-cream-data';
import { MenuItem } from '../models/menu-item';

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
    <PageSection title="Rock your taste buds with one of these!">
      <LoadingSpinner
        loadingMessage="Loading ice cream menu..."
        doneLoadingMessage="Done Loading menu."
        isLoading={isLoading}
      ></LoadingSpinner>
      {iceCreamsList.length > 0 && (
        <ul className="container">
          {iceCreamsList.map((iceCream) => (
            <li key={iceCream.id.toString()}>
              <MenuCard menuItem={iceCream}></MenuCard>
            </li>
          ))}
        </ul>
      )}
    </PageSection>
  );
};

export default Menu;
