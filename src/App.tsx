import React, { Fragment } from 'react';
import './styles/ice-cream.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import IceCream from './pages/IceCream';

function App() {
  return (
    <Fragment>
      <Header></Header>
      <main>
        <Routes>
          <Route path='/' Component={Menu}></Route>
          <Route path='/ice-creams/:id' Component={IceCream} ></Route>
        </Routes>
      </main>
      <Footer></Footer>
    </Fragment>
  );
}

export default App;
