import { useEffect, useState } from 'react';
import MenuCard from '../components/menu/MenuCard';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { getAvailableStock } from '../data/ice-cream-data';
import { MenuItem } from '../models/menu-item';

const IceCreamsList = () => {
  const [iceCreamsList, setIceCreamsList] = useState([] as MenuItem[]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async (isMounted: boolean) => {
    const data = await getAvailableStock();
    if (isMounted) {
      setIceCreamsList([
        ...data.map((iceCream) => {
          return {
            id: 0,
            iceCream,
            inStock: false,
            quantity: 0,
            price: 0,
            description: '',
          } as MenuItem;
        }),
      ]);
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
    <section>
      <h2 className="main-heading">Choose your poison and enjoy!</h2>
      <LoadingSpinner
        loadingMessage="Loading available stock..."
        doneLoadingMessage="Done loading available stock."
        isLoading={isLoading}
      ></LoadingSpinner>
      {iceCreamsList.length > 0 && (
        <ul className="container">
          {iceCreamsList.map((iceCream) => (
            <li key={iceCream.id.toString()}>
              <MenuCard menuItem={iceCream} showCardContent={false}></MenuCard>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default IceCreamsList;
