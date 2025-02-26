import React, { useState } from 'react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic
    console.log('Subscribing:', email);
    setEmail('');
    // Could show a success message here
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-container">
          <form className="subscription-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Your Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">SUBSCRIBE</button>
          </form>
          
          <div className="footer-links">
            <a href="#">Best Sellers</a>
            <a href="#">Gift Ideas</a>
            <a href="#">New Releases</a>
            <a href="#">Today's Deals</a>
            <a href="#">Customer Service</a>
          </div>
          
          <div className="helpline">
            <span>Help Line Number: +1 1800 1200 1200</span>
          </div>
          
          <div className="copyright">
            © 2020 All Rights Reserved. Design by Free html Templates
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;