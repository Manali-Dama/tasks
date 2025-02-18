"use client";

import React from "react";

const Input = ({ value, readOnly, className ,onChange,placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      placeholder={placeholder}
      className={`border rounded p-2 font-sans ${className}`}
    /> 
  );
};

export default Input;