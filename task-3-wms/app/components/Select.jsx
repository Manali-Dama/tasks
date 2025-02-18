"use client";

import React from "react";

const Select = ({ id, label, options, value, onChange, className }) => {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className={`border border-black rounded p-2 font-sans ${className}`}
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;