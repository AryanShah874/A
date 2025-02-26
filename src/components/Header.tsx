import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleCart } from '../redux/slices/cartSlice';

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchTerm);
  };

  return (
    <header>
      <div className="container">
        <div className="header-container">
          <a href="/" className="logo">Kickdrum</a>
          
          <div className="search-bar">
            <form onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="Search this blog" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">
                <i className="fas fa-search">🔍</i>
              </button>
            </form>
          </div>
          
          <div className="cart-icon" onClick={() => dispatch(toggleCart())}>
            CART
            {cartItemCount > 0 && (
              <span className="cart-count">{cartItemCount}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;