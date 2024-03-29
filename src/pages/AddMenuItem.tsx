import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import PageContainer from '../components/structure/PageContainer';
import { addMenuItem, getIceCream } from '../data/ice-cream-data';
import { IceCream } from '../models/ice-cream';
import { IceCreamFormState } from '../models/ice-cream-form-state';
import IceCreamForm from '../components/shared/IceCreamForm';

const AddMenuItem = () => {
  const isMounted = useRef(true);
  let [searchParams] = useSearchParams();
  const [iceCream, setIceCream] = useState(null as IceCream | null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage] = useState('Adding ice cream to menu...');
  const [doneLoadingMessage] = useState('Done adding ice cream.');
  const [doRedirect, setDoRedirect] = useState(false);

  useEffect(() => {
    isMounted.current = true;
    const id = searchParams.get('iceCreamId');
    if (id) {
      loadIceCream(+id, isMounted);
    }

    return () => {
      isMounted.current = false;
    };
  }, [searchParams]);

  const loadIceCream = async (
    id: number,
    isMounted: MutableRefObject<boolean>
  ): Promise<void> => {
    setIsLoading(true);
    const iceCream = await getIceCream(id);
    if (iceCream && isMounted.current) {
      setIceCream({ ...iceCream });
      setIsLoading(false);
    } else {
      setDoRedirect(true);
    }
  };

  const onFormSubmit = async ({
    description,
    inStock,
    price,
    quantity,
  }: IceCreamFormState) => {
    if (iceCream) {
      setIsLoading(true);
      await addMenuItem({
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
    <PageContainer title="Add some goodness to the menu">
      {doRedirect && <Navigate to="/" state={{ focus: true }}></Navigate>}
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
    </PageContainer>
  );
};

export default AddMenuItem;
