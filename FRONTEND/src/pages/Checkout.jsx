import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../components/Context/ShopContext';
import axios from 'axios';
import './CSS/Checkout.css';

const Checkout = () => {
  const {
    getCartItemsWithDetails,
    getTotalCartAmount,
    token,
    fetchCart // ✅ make sure this comes from ShopContext
  } = useContext(ShopContext);

  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  // Get cart items and totals
  const cartItems = getCartItemsWithDetails();
  const subtotal = getTotalCartAmount();
  const shippingFee = subtotal >= 50 ? 0 : 5;
  const total = subtotal + shippingFee;

  // Shipping form state
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

  // Verify backend cart on load
  useEffect(() => {
    const verifyBackendCart = async () => {
      if (!token) return;

      try {
        const res = await axios.get(`${backendUrl}/api/cart/get`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('🔍 Backend cart data:', res.data.cartData);
        if (!res.data.cartData || Object.keys(res.data.cartData).length === 0) {
          console.warn('⚠️ Backend cart is empty!');
        }
      } catch (err) {
        console.error('❌ Failed to fetch backend cart:', err.response?.data || err.message);
      }
    };

    verifyBackendCart();
  }, [token, backendUrl]);

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (method) => setPaymentMethod(method);

  // Form validation
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

  // Place order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (cartItems.length === 0) {
      setError('Your cart is empty. Please add items before placing order.');
      setLoading(false);
      return;
    }

    if (!token) {
      setError('Please login to place an order');
      setLoading(false);
      navigate('/Login');
      return;
    }

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/orders`,
        { shippingAddress, paymentMethod },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        // ✅ Use fetchCart from context to refresh cart after order
        if (fetchCart) await fetchCart();

        // Navigate to order success
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

  // Redirect if local cart is empty
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

        {error && <div className="checkout-error"><p>{error}</p></div>}

        <div className="checkout-content">
          {/* Shipping Form */}
          <div className="checkout-form-section">
            <h2>Shipping Details</h2>
            {['fullName','address','city','state','zipCode','country','phone'].map((field) => (
              <div className="form-group" key={field}>
                <label htmlFor={field}>{field.replace(/([A-Z])/g, ' $1')} *</label>
                <input
                  type={field === 'phone' ? 'tel' : 'text'}
                  id={field}
                  name={field}
                  value={shippingAddress[field]}
                  onChange={handleInputChange}
                  required
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                />
              </div>
            ))}

            {/* Payment */}
            <div className="payment-section">
              <h2>Payment Method</h2>
              {['cod','card','paypal'].map((method) => (
                <label key={method} className={`payment-option ${paymentMethod === method ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => handlePaymentChange(e.target.value)}
                  />
                  <span>{method === 'cod' ? 'Cash on Delivery' : method === 'card' ? 'Credit/Debit Card' : 'PayPal'}</span>
                </label>
              ))}
            </div>

            <button type="button" onClick={handlePlaceOrder} className="place-order-btn" disabled={loading}>
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>

          {/* Order Summary */}
          <div className="checkout-summary-section">
            <h2>Order Summary</h2>
            {cartItems.map((item, idx) => (
              <div key={`${item.id}-${item.size}-${idx}`} className="order-item">
                <img src={item.productInfo?.image} alt={item.productInfo?.name} className="order-item-image" />
                <div className="order-item-details">
                  <h4>{item.productInfo?.name}</h4>
                  <p>Size: {item.size}</p>
                  <p>Qty: {item.quantity}</p>
                  <p className="order-item-price">${(item.productInfo?.new_price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}

            <div className="order-totals">
              <div className="total-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="total-row"><span>Shipping</span><span>{shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}</span></div>
              <div className="total-row final-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
