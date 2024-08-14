import React, { useState } from 'react';
import Authentication from './Authentication';
import './Navbar.css';

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">.Index Rentals</div>
        <div className="navbar-links">
          <button
            className="login-button"
            onClick={() => setShowLogin(!showLogin)}
          >
            {showLogin ? 'Close' : 'Login'}
          </button>
        </div>
      </div>
      {showLogin && (
          <Authentication />
      )}
    </nav>
  );
};

export default Navbar;