import React, { useContext } from 'react';
import './cartItems.css';
import { ShopContext } from '../Context/ShopContext';
import remove_icon from '../assests/cart_cross_icon.png';
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
  const navigate = useNavigate();

  const { getTotalCartAmount, cartItems, removeFromCart, getCartItemsWithDetails } = useContext(ShopContext);

  const cartItemsWithDetails = getCartItemsWithDetails();

  if (Object.keys(cartItems).length === 0) {
    return (
      <div className='cartItems container'>
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <p>Add some products to see them here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className='cartItems container'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Size</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {cartItemsWithDetails.map((cartItem, index) => {
        const { productInfo, size, quantity, id } = cartItem;

        if (!productInfo) {
          return null;
        }

        return (
          <div key={`${id}-${size}-${index}`}>
            <div className="cartitem-format">
              <img src={productInfo.image} alt={productInfo.name} className='carticon_product-icon' />
              <p>{productInfo.name}</p>
              <p>${productInfo.new_price}</p>
              <p className="cart-item-size">{size}</p>
              <button className='cartitems-quantity'>{quantity}</button>
              <p>${(productInfo.new_price * quantity).toFixed(2)}</p>
              <img
                src={remove_icon}
                onClick={() => removeFromCart(id, size)}
                alt="Remove item"
                style={{ cursor: 'pointer' }}
              />
            </div>
            <hr />
          </div>
        );
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount().toFixed(2)}</h3>
            </div>
          </div>
          <button onClick={() => navigate('/checkout')}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;