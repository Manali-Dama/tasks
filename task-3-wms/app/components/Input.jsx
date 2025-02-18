"use client";

import React from "react";

const Input = ({ value, readOnly, className }) => {
  return (
    <input
      type="text"
      value={value}
      readOnly={readOnly}
      className={`border border-red-500 rounded p-2 w-64 ${className}`}
    />
  );
};

export default Input;