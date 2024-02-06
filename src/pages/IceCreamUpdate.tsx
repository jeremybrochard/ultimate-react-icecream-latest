import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import IceCreamForm, { FormState } from '../components/shared/IceCreamForm';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import PageSection from '../components/structure/PageSection';
import {
  deleteMenuItem,
  getMenuItem,
  updateMenuItem,
} from '../data/ice-cream-data';
import { MenuItem } from '../models/menu-item';

const IceCreamUpdate = () => {
  const isMounted = useRef(true);
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState(null as MenuItem | null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState(`Loading ice cream...`);
  const [doneLoadingMessage, setDoneLoadingMessage] = useState(
    `Done loading ice cream.`
  );
  const [doRedirectToHomePage, setDoRedirectToHomePage] = useState(false);

  useEffect(() => {
    isMounted.current = true;
    if (id) {
      loadIceCream(+id, isMounted);
    }

    return () => {
      isMounted.current = false;
    };
  }, [id]);

  const loadIceCream = async (
    id: number,
    isMounted: MutableRefObject<boolean>
  ): Promise<void> => {
    const menuItem = await getMenuItem(id);
    if (menuItem && isMounted.current) {
      setMenuItem({ ...menuItem });
      setIsLoading(false);
    }
  };

  const onFormSubmit = async ({
    description,
    inStock,
    price,
    quantity,
  }: FormState) => {
    if (menuItem) {
      setLoadingMessage('Updating ice cream...');
      setDoneLoadingMessage('Done updating ice cream.');
      setIsLoading(true);
      const updatedIceCream = await updateMenuItem({
        id: menuItem.id,
        iceCream: menuItem?.iceCream,
        description,
        inStock,
        price,
        quantity,
      });
      setMenuItem({ ...updatedIceCream });
      setIsLoading(false);
      setTimeout(() => {
        setDoRedirectToHomePage(true);
      }, 400);
    }
  };

  const onDelete = async () => {
    if (id) {
      setLoadingMessage('Deleting ice cream...');
      setDoneLoadingMessage(
        'Done deleting ice cream, redirecting to home page.'
      );
      setIsLoading(true);
      const isSuccess = await deleteMenuItem(+id);

      if (isSuccess) {
        setIsLoading(false);
        setTimeout(() => {
          setDoRedirectToHomePage(true);
        }, 400);
      }
    }
  };

  return (
    <PageSection title="Update this beauty">
      {doRedirectToHomePage && (
        <Navigate to="/" state={{ focus: true }}></Navigate>
      )}
      <LoadingSpinner
        loadingMessage={loadingMessage}
        doneLoadingMessage={doneLoadingMessage}
        isLoading={isLoading}
      ></LoadingSpinner>
      {!isLoading && menuItem && (
        <IceCreamForm
          initialState={menuItem}
          iceCream={menuItem.iceCream}
          onFormSubmit={onFormSubmit}
          additionalButtons={
            <button className="warning" type="button" onClick={onDelete}>
              Delete
            </button>
          }
        ></IceCreamForm>
      )}
    </PageSection>
  );
};

export default IceCreamUpdate;
