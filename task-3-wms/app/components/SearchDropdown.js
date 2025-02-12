"use client";

import React, { useState, useEffect } from "react";
import api from "@/utils/axiosInstance"; // Import Axios instance

const SearchDropdown = ({ field, value, onChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.length > 2) {
      fetchOptions();
    } else {
      setOptions([]);
    }
  }, [searchTerm]);

  const fetchOptions = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/master/${field.options}`, {
        params: {
          search: searchTerm + ",name",
          status: "Active",
        },
      });
      console.log(response);

      setOptions(response.data?.manufacturers.map((item) => item.name) || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setOptions([]);
    }
    setLoading(false);
  };

  return (
    <div className="form-group search-dropdown">
      <label>
        {field.label} {field.required && <span className="required">*</span>}
      </label>
      <input
        type="text"
        className="form-input"
        placeholder={`Search ${field.label}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading && <div className="loading-text">Loading...</div>}
      {options.length > 0 && (
        <ul className="dropdown-list">
          {options.map((option, index) => (
            <li
              key={index}
              className="dropdown-item"
              onClick={() => {
                onChange({ target: { value: option } }, field); // Fix onChange event
                setSearchTerm(option); // Set selected value
                setOptions([]); // Hide dropdown
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchDropdown;
