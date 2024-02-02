import { Navigate, useSearchParams } from 'react-router-dom';
import PageSection from '../components/structure/PageSection';
import IceCreamForm, { FormState } from '../components/shared/IceCreamForm';
import { IceCream } from '../models/ice-cream';
import { useEffect, useState } from 'react';
import { addMenuItem, getIceCream } from '../data/ice-cream-data';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const IceCreamAdd = () => {
  let [searchParams] = useSearchParams();
  const [iceCream, setIceCream] = useState(null as IceCream | null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage] = useState('Adding ice cream to menu...');
  const [doneLoadingMessage] = useState('Done adding ice cream.');
  const [doRedirect, setDoRedirect] = useState(false);

  useEffect(() => {
    const id = searchParams.get('iceCreamId');
    if (id) {
      loadIceCream(+id);
    }
  }, [searchParams]);

  const loadIceCream = async (id: number): Promise<void> => {
    const iceCream = await getIceCream(id);
    if (iceCream) {
      setIceCream({ ...iceCream });
      setIsLoading(false);
    }
  };

  const onFormSubmit = async ({
    description,
    inStock,
    price,
    quantity,
  }: FormState) => {
    if (iceCream) {
      setIsLoading(true);
      await addMenuItem({
        id: 0,
        iceCream: iceCream,
        description,
        inStock,
        price,
        quantity,
      });
      setIsLoading(false);
      setDoRedirect(true);
    }
  };

  return (
    <PageSection title="Add ice cream to menu">
      {doRedirect && <Navigate to="/"></Navigate>}
      <LoadingSpinner
        loadingMessage={loadingMessage}
        doneLoadingMessage={doneLoadingMessage}
        isLoading={isLoading}
      ></LoadingSpinner>
      {iceCream && (
        <IceCreamForm
          iceCream={iceCream}
          onFormSubmit={onFormSubmit}
        ></IceCreamForm>
      )}
    </PageSection>
  );
};

export default IceCreamAdd;
