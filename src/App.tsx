import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/structure/Footer';
import Header from './components/structure/Header';

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
