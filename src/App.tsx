import { Fragment } from 'react';
import Footer from './components/structure/Footer';
import Header from './components/structure/Header';
import './styles/ice-cream.scss';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <Fragment>
      <Header></Header>
      <main>
        <Outlet />
      </main>
      <Footer></Footer>
    </Fragment>
  );
}

export default App;
