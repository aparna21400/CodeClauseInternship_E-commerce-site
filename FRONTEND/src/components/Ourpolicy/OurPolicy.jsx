import React from 'react';

const Policy = () => {
  return (
    <div className="policy container">
      <div className="policy-item">
        <img src="/assets/policy1.png" alt="Free delivery" />
        <div>
          <h3>FREE DELIVERY</h3>
          <p>Free shipping on all orders</p>
        </div>
      </div>
      <div className="policy-item">
        <img src="/assets/policy2.png" alt="7 days return" />
        <div>
          <h3>7 DAYS RETURN</h3>
          <p>Easy return policy</p>
        </div>
      </div>
      <div className="policy-item">
        <img src="/assets/policy3.png" alt="Secure payment" />
        <div>
          <h3>SECURE PAYMENT</h3>
          <p>100% secure payment</p>
        </div>
      </div>
    </div>
  );
};
export default Policy;
