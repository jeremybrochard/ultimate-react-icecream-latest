import { HelmetProvider } from 'react-helmet-async';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  defer,
} from 'react-router-dom';
import App from './App';
import { getAvailableStock } from './data/ice-cream-data';
import AddMenuItem from './pages/AddMenuItem';
import EditMenuItem from './pages/EditMenuItem';
import IceCreams from './pages/IceCreams';
import Menu from './pages/Menu';
import './styles/ice-cream.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Menu />,
      },
      {
        path: 'menu/add',
        element: <AddMenuItem />,
      },
      {
        path: 'menu/:id',
        element: <EditMenuItem />,
      },
      {
        path: 'ice-creams',
        element: <IceCreams />,
        loader: async () => {
          const iceCreamsListPromise = getAvailableStock();
          return defer({
            iceCreamsList: iceCreamsListPromise,
          });
        },
      },
      {
        path: '*',
        element: <Navigate to="/" state={{ focus: true }} />,
      },
    ],
  },
]);

function Root() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default Root;
