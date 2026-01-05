import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';

const Orders = () => {
  const { cartItems } = useContext(ShopContext);
  
  return (
    <div className="orders container">
      <h1>My Orders</h1>
      <div className="order-item">
        <div className="order-details">
          <p>Order #1234 - Dec 30, 2025</p>
          <p>S, M - Qty: 2</p>
        </div>
        <button>Track Order</button>
      </div>
    </div>
  );
};
export default Orders;
