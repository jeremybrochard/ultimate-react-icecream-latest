import { Suspense } from 'react';
import { Await, Link, useLoaderData } from 'react-router-dom';
import MenuCard from '../components/menu/MenuCard';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import PageSection from '../components/structure/PageSection';
import { IceCream } from '../models/ice-cream';

const IceCreamList = () => {
  const data = useLoaderData() as { iceCreamsList: Promise<IceCream[]> };

  return (
    <PageSection title="Choose your poison and enjoy!">
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
                        <Link to={`/ice-creams/add?iceCreamId${iceCream.id}`}>
                          <h3>{iceCream.name}</h3>
                        </Link>
                      </MenuCard>
                    </li>
                  ))}
                </ul>
              </>
            )
          }
        </Await>
      </Suspense>
    </PageSection>
  );
};

export default IceCreamList;
