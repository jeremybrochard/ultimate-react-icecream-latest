import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuCard from '../components/menu/MenuCard';
import MenuCardContent from '../components/menu/MenuCardContent';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import PageSection from '../components/structure/PageSection';
import { getMenu } from '../data/ice-cream-data';
import { MenuItem } from '../models/menu-item';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([] as MenuItem[]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const isMounted = useRef(true);

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
              <MenuCard
                iceCream={item.iceCream}
                onClick={() => navigate(`/ice-creams/${item.id}`)}
              >
                <h3>
                  <Link
                    to={`/ice-creams/${item.id}`}
                    state={{ focus: true }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    {item.iceCream.name}
                  </Link>
                </h3>
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
