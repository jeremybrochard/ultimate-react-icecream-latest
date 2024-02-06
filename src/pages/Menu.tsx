import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuCard from '../components/menu-card/MenuCard';
import MenuCardList from '../components/menu-card/MenuCardList';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import PageContainer from '../components/structure/PageContainer';
import { getMenu } from '../data/ice-cream-data';
import { MenuItem } from '../models/menu-item';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([] as MenuItem[]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const isMounted = useRef(true);
  const getLink = (id: number) => `/menu/${id}`;

  const loadData = async (isMounted: MutableRefObject<boolean>) => {
    const data = await getMenu();
    if (isMounted.current) {
      setMenuItems([...data]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    loadData(isMounted);

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <PageContainer title="Rock your taste buds with one of these!">
      <LoadingSpinner
        loadingMessage="Loading ice cream menu..."
        doneLoadingMessage="Done Loading menu."
        isLoading={isLoading}
      ></LoadingSpinner>
      {menuItems.length > 0 && (
        <MenuCardList>
          {menuItems.map((item) => (
            <MenuCard
              key={item.id.toString()}
              iceCream={item.iceCream}
              onClick={() => navigate(getLink(item.id))}
              linkTo={getLink(item.id)}
            >
              <div className="card-content">
                <p className="price">${item.price.toFixed(2)}</p>
                {item.inStock ? (
                  <p className="stock">{item.quantity} in stock</p>
                ) : (
                  <p className="stock out">Currently out of stock</p>
                )}
                <p className="description">{item.description}</p>
              </div>
            </MenuCard>
          ))}
        </MenuCardList>
      )}
    </PageContainer>
  );
};

export default Menu;
