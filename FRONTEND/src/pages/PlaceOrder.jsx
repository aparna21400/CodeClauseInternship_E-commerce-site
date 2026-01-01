import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    name: '', address: '', city: '', country: '', zip: '', payment: 'cod'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Order placed successfully!');
  };

  return (
    <div className="placeorder container">
      <div className="placeorder-left">
        <form onSubmit={handleSubmit}>
          <h2>Delivery Info</h2>
          <input type="text" placeholder="Full Name" required />
          <input type="text" placeholder="Street Address" required />
          <div className="two-col">
            <input type="text" placeholder="City" required />
            <input type="text" placeholder="Country" required />
          </div>
          <input type="number" placeholder="ZIP Code" required />
          
          <h2>Payment</h2>
          <div className="payment-options">
            <label><input type="radio" name="payment" value="cod" /> Cash on Delivery</label>
            <label><input type="radio" name="payment" value="stripe" /> Stripe</label>
            <label><input type="radio" name="payment" value="razorpay" /> Razorpay</label>
          </div>
          <button type="submit">PLACE ORDER</button>
        </form>
      </div>
      <div className="placeorder-right">
        <h2>Order Summary</h2>
        <div className="order-total">
          <p>Total: ${getTotalCartAmount()}</p>
          <p>Shipping: $10</p>
          <p className="final-total">${getTotalCartAmount() + 10}</p>
        </div>
      </div>
    </div>
  );
};
export default PlaceOrder;
