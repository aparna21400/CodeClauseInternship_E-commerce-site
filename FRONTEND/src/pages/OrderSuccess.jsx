// FRONTEND/src/pages/OrderSuccess.jsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CSS/OrderSuccess.css';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get order details from navigation state
  const orderData = location.state?.order;
  const orderNumber = location.state?.orderNumber || orderData?.orderNumber;

  // Redirect to home if no order data
  useEffect(() => {
    if (!orderNumber && !orderData) {
      // If user accessed this page directly without order data, redirect to home
      navigate('/');
    }
  }, [orderNumber, orderData, navigate]);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate order totals
  const getOrderTotals = () => {
    if (!orderData) return { subtotal: 0, shippingFee: 0, total: 0 };
    return {
      subtotal: orderData.subtotal || 0,
      shippingFee: orderData.shippingFee || 0,
      total: orderData.total || 0
    };
  };

  const { subtotal, shippingFee, total } = getOrderTotals();

  return (
    <div className="order-success-container">
      <div className="order-success-wrapper">
        {/* Success Icon */}
        <div className="success-icon">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="success-title">Order Placed Successfully!</h1>
        <p className="success-message">
          Thank you for your order. We've received your order and will begin processing it right away.
        </p>

        {/* Order Number */}
        {orderNumber && (
          <div className="order-number-section">
            <p className="order-number-label">Order Number</p>
            <p className="order-number">{orderNumber}</p>
          </div>
        )}

        {/* Order Details */}
        {orderData && (
          <div className="order-details-card">
            <h2>Order Details</h2>

            {/* Shipping Address */}
            {orderData.shippingAddress && (
              <div className="detail-section">
                <h3>Shipping Address</h3>
                <div className="address-details">
                  <p>{orderData.shippingAddress.fullName}</p>
                  <p>{orderData.shippingAddress.address}</p>
                  <p>
                    {orderData.shippingAddress.city}, {orderData.shippingAddress.state}{' '}
                    {orderData.shippingAddress.zipCode}
                  </p>
                  <p>{orderData.shippingAddress.country}</p>
                  <p>Phone: {orderData.shippingAddress.phone}</p>
                </div>
              </div>
            )}

            {/* Order Items */}
            {orderData.items && orderData.items.length > 0 && (
              <div className="detail-section">
                <h3>Order Items</h3>
                <div className="order-items-list">
                  {orderData.items.map((item, index) => (
                    <div key={index} className="order-item-card">
                      {item.product && (
                        <>
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="item-image"
                          />
                          <div className="item-info">
                            <h4>{item.product.name}</h4>
                            <p>Size: {item.size}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p className="item-price">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment & Totals */}
            <div className="detail-section">
              <div className="payment-info">
                <p>
                  <strong>Payment Method:</strong>{' '}
                  {orderData.paymentMethod === 'cod'
                    ? 'Cash on Delivery'
                    : orderData.paymentMethod === 'card'
                    ? 'Credit/Debit Card'
                    : orderData.paymentMethod?.toUpperCase()}
                </p>
                <p>
                  <strong>Order Date:</strong> {formatDate(orderData.createdAt)}
                </p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={`status-badge status-${orderData.status}`}>
                    {orderData.status?.charAt(0).toUpperCase() + orderData.status?.slice(1)}
                  </span>
                </p>
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
        )}

        {/* Action Buttons */}
        <div className="action-buttons">
          <button
            className="btn-primary"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
          <button
            className="btn-secondary"
            onClick={() => navigate('/orders')}
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;