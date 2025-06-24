import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './components/responsive/responsive.css';
import ShopContextProvider from './components/Context/ShopContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ShopContextProvider>
    <App />
  </ShopContextProvider>

);


