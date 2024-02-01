import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import MenuCard from '../components/menu/MenuCard';
import MenuCardHeader from '../components/menu/MenuCardHeader';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { IceCream } from '../models/ice-cream';

const IceCreamsList = () => {
  const data = useLoaderData() as { iceCreamsList: Promise<IceCream[]> };

  return (
    <section>
      <h2 className="main-heading">Choose your poison and enjoy!</h2>
      <Suspense
        fallback={
          <LoadingSpinner
            loadingMessage="Loading available stock..."
            doneLoadingMessage="Done loading available stock."
          ></LoadingSpinner>
        }
      >
        <Await resolve={data.iceCreamsList} errorElement={<p>ERROR</p>}>
          {(iceCreamsList: IceCream[]) =>
            iceCreamsList.length > 0 && (
              <>
                <div aria-live="assertive" aria-atomic="true">
                  <p className="visually-hidden">
                    Done loading available stock.
                  </p>
                </div>
                <ul className="container">
                  {iceCreamsList.map((iceCream) => (
                    <li key={iceCream.id.toString()}>
                      <MenuCard iceCream={iceCream}>
                        <MenuCardHeader
                          iceCreamName={iceCream.name}
                          id={iceCream.id}
                          action="add"
                        ></MenuCardHeader>
                      </MenuCard>
                    </li>
                  ))}
                </ul>
              </>
            )
          }
        </Await>
      </Suspense>
    </section>
  );
};

export default IceCreamsList;
