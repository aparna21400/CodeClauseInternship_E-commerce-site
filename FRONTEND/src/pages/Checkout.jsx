// FRONTEND/src/pages/Checkout.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../components/Context/ShopContext';
import axios from 'axios';
import './CSS/Checkout.css';

const Checkout = () => {
  const { 
    getCartItemsWithDetails, 
    getTotalCartAmount, 
    token,
    fetchCart 
  } = useContext(ShopContext);
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  // Get cart items and calculate totals
  const cartItems = getCartItemsWithDetails();
  const subtotal = getTotalCartAmount();
  const shippingFee = subtotal >= 50 ? 0 : 5;
  const total = subtotal + shippingFee;

  // Form state for shipping address
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState('cod');
  
  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle payment method change
  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  // Validate form
  const validateForm = () => {
    const requiredFields = ['fullName', 'address', 'city', 'state', 'zipCode', 'country', 'phone'];
    for (let field of requiredFields) {
      if (!shippingAddress[field].trim()) {
        setError(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    return true;
  };

  // Handle place order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Check authentication
    if (!token) {
      setError('Please login to place an order');
      setLoading(false);
      navigate('/Login');
      return;
    }

    // Validate form
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Create order via API
      const response = await axios.post(
        `${backendUrl}/api/orders`,
        {
          shippingAddress,
          paymentMethod
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        // Clear cart from context
        await fetchCart();
        
        // Navigate to order success page with order ID
        navigate('/order-success', {
          state: {
            orderNumber: response.data.order.orderNumber,
            order: response.data.order
          }
        });
      } else {
        setError(response.data.message || 'Failed to place order');
      }
    } catch (err) {
      console.error('Order placement error:', err);
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <div className="checkout-empty">
          <h2>Your cart is empty</h2>
          <p>Add some products to your cart before checkout</p>
          <button onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        <h1 className="checkout-title">Checkout</h1>

        {/* Error message */}
        {error && (
          <div className="checkout-error">
            <p>{error}</p>
          </div>
        )}

        <div className="checkout-content">
          {/* Left side - Shipping Form */}
          <div className="checkout-form-section">
            <h2>Shipping Details</h2>
            <form onSubmit={handlePlaceOrder}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={shippingAddress.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleInputChange}
                  required
                  placeholder="123 Main Street"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    required
                    placeholder="New York"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleInputChange}
                    required
                    placeholder="NY"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="zipCode">Zip Code *</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={shippingAddress.zipCode}
                    onChange={handleInputChange}
                    required
                    placeholder="10001"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country *</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleInputChange}
                    required
                    placeholder="United States"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={shippingAddress.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+1 234 567 8900"
                />
              </div>

              {/* Payment Method Selection */}
              <div className="payment-section">
                <h2>Payment Method</h2>
                <div className="payment-options">
                  <label className={`payment-option ${paymentMethod === 'cod' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => handlePaymentChange(e.target.value)}
                    />
                    <span>Cash on Delivery</span>
                  </label>

                  <label className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => handlePaymentChange(e.target.value)}
                    />
                    <span>Credit/Debit Card</span>
                  </label>

                  <label className={`payment-option ${paymentMethod === 'paypal' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => handlePaymentChange(e.target.value)}
                    />
                    <span>PayPal</span>
                  </label>
                </div>
              </div>

              <button 
                type="submit" 
                className="place-order-btn"
                disabled={loading}
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Right side - Order Summary */}
          <div className="checkout-summary-section">
            <h2>Order Summary</h2>
            
            <div className="order-items">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${item.size}-${index}`} className="order-item">
                  <img 
                    src={item.productInfo?.image} 
                    alt={item.productInfo?.name}
                    className="order-item-image"
                  />
                  <div className="order-item-details">
                    <h4>{item.productInfo?.name}</h4>
                    <p>Size: {item.size}</p>
                    <p>Qty: {item.quantity}</p>
                    <p className="order-item-price">
                      ${(item.productInfo?.new_price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="total-row final-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;