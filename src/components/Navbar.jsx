import React, { useState } from 'react'
import Authentication from './Authentication';
import './Navbar.css'

const Navbar = () => {

  return (
    <nav className="navbar">
      <div className="navbar-container">
      <Authentication />
    </div>
    </nav>
  );
};

export default Navbar;