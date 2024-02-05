import { Fragment } from 'react';
import Footer from './components/structure/Footer';
import Header from './components/structure/Header';
import './styles/ice-cream.scss';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <Fragment>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header></Header>
      <main tabIndex={-1} id="main">
        <Outlet />
      </main>
      <Footer></Footer>
    </Fragment>
  );
}

export default App;
