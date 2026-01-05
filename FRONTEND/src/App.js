// FRONTEND/src/App.js
import './App.css';
import './components/responsive/responsive.css';
import Navbar from './components/navbar/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';
import ProductCart from './pages/ProductCart';
import LoginSignup from './pages/LoginSignup';
import Footer from './components/Footer/Footer';
import men_banner from './components/assests/banner_mens.png';
import women_banner from './components/assests/banner_women.png';
import kid_banner from './components/assests/banner_kids.png';
import CartItems from './components/cartItems/CartItems';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Orders from './pages/Orders';

function App() {
  return (
    <div className='main-content'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/mens' element={<Category banner={men_banner} category="men" />} />
          <Route path='/womens' element={<Category banner={women_banner} category="women" />} />
          <Route path='/kids' element={<Category banner={kid_banner} category="kid" />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/ProductCart' element={<ProductCart />} />
          <Route path='/cart' element={<CartItems />} /> 
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/order-success' element={<OrderSuccess />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/Login' element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
