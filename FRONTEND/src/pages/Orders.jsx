import React from 'react';

const Orders = () => {

  
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
