// components/Button.js

import React from 'react';
import '../globals.css';

// You can pass custom classes for different styles and any other props you need
const Button = ({ onClick, children, type = 'button', className = '', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-2 px-4 rounded bg-[#5556a6] text-white font-semibold disabled:bg-gray-400 ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
