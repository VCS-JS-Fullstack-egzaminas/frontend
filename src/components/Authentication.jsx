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
      <div className="button-div">
      <button id="btn-one">Login</button>
      </div>
    </div>
  );
};

export default Authentication;