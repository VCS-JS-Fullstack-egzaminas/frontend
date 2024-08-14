import React from 'react';
import './Authentication.css';

const Authentication = () => {
  return (
    <div className="auth-container">
      <input
        type="text"
        placeholder="Username"
        className="input-field-one"
      />
      <input
        type="password"
        placeholder="Password"
        className="input-field-one"
      />
      <button id="btn-one">Login</button>
    </div>
  );
};

export default Authentication;