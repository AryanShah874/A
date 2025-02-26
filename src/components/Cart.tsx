import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { 
  toggleCart, 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart 
} from '../redux/slices/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state: RootState) => state.cart);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    setShowConfirmation(true);
  };

  const handleConfirmCheckout = () => {
    dispatch(clearCart());
    setShowConfirmation(false);
    dispatch(toggleCart());
  };

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={() => dispatch(toggleCart())}></div>
      <div className={`cart ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="close-cart" onClick={() => dispatch(toggleCart())}>×</button>
        </div>
        <div className="cart-items">
          {items.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="item-details">
                  <h4>{item.title}</h4>
                  <div className="price">${(item.price * item.quantity).toFixed(2)}</div>
                  <div className="quantity-control">
                    <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
                  </div>
                </div>
                <button 
                  className="remove-item" 
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="total">
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <button 
            className="checkout-btn" 
            onClick={handleCheckout}
            disabled={items.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>

      {showConfirmation && (
        <div className="checkout-confirmation">
          <h3>Order Confirmed!</h3>
          <p>Thank you for your purchase. Your order has been successfully placed.</p>
          <button onClick={handleConfirmCheckout}>OK</button>
        </div>
      )}
    </>
  );
};

export default Cart;