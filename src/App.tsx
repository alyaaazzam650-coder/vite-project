// import React from 'react';
import NavBar from './Components/NavBar';
import './index.css';
import './App.css';
import Home from './Pages/Home';
import GameDetails from './Pages/ProductDetails';
import { Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import { CartProvider } from './Context/CartContext';
import CartPage from './Pages/Cart';
import Contact from './Components/Contact';
import Login from './Pages/Login';
import User from './Pages/User';
import Checkout from './Pages/CheckOut';

function App() {
  return (
    <CartProvider>
      <div className="app-wrapper">
        <NavBar />
        <main>
          <Routes>
            <Route path='/'            element={<Home />}        />
            <Route path='/product/:id' element={<GameDetails />} />
            <Route path='/cart'        element={<CartPage />}    />
            <Route path='/login'       element={<Login />}       />
            <Route path='/user'        element={<User />}        />
            <Route path='/checkout'    element={<Checkout />}    />
          </Routes>
        </main>
        <Contact />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;