import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
import { getAvailableStock } from './data/ice-cream-data';
import IceCreamList from './pages/IceCreamList';
import IceCreamUpdate from './pages/IceCreamUpdate';
import Menu from './pages/Menu';
import IceCreamAdd from './pages/IceCreamAdd';

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
        path: 'ice-creams',
        element: <IceCreamList />,
        loader: async() => {
          const iceCreamsListPromise = getAvailableStock();
          return defer({
            iceCreamsList: iceCreamsListPromise
        })}
      },
      {
        path: 'ice-creams/add',
        element: <IceCreamAdd />,
      },
      {
        path: 'ice-creams/:id',
        element: <IceCreamUpdate />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
