import { Suspense } from 'react';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import MenuCard from '../components/menu-card/MenuCard';
import MenuCardList from '../components/menu-card/MenuCardList';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import PageContainer from '../components/structure/PageContainer';
import { IceCream } from '../models/ice-cream';

const IceCreams = () => {
  const data = useLoaderData() as { iceCreamsList: Promise<IceCream[]> };
  const navigate = useNavigate();
  const getLink = (id: number) => `/menu/add?iceCreamId=${id}`;

  return (
    <PageContainer title="Choose your poison and enjoy!">
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
                <MenuCardList>
                  {iceCreamsList.map((iceCream) => (
                    <MenuCard
                      iceCream={iceCream}
                      key={iceCream.id.toString()}
                      linkTo={getLink(iceCream.id)}
                      onClick={() => navigate(getLink(iceCream.id))}
                    ></MenuCard>
                  ))}
                </MenuCardList>
              </>
            )
          }
        </Await>
      </Suspense>
    </PageContainer>
  );
};

export default IceCreams;
