"use client";

import React, { useState, useEffect } from "react";
import Select from "./Select";
import Input from "./Input";

const DynamicForm = ({ config, Options, onClose }) => {
  const [formData, setFormData] = useState({ product_type: "Goods" });
  const [errors, setErrors] = useState({});
  const [options, setOptions] = useState({});

  useEffect(() => {
    setOptions(Options);
  }, [Options]);

  const handleChange = (fieldKey, value) => {
    setFormData((prevData) => ({ ...prevData, [fieldKey]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    config.forEach(({ fieldKey, label, required, input_type }) => {
      const value = formData[fieldKey];

      if (input_type === "number" && isNaN(Number(value))) {
        newErrors[fieldKey] = `${label} should be a number`;
      } else if (input_type === "string" && /^\d+$/.test(value)) {
        newErrors[fieldKey] = `${label} should be a string`;
      }

      if (required && !value) {
        newErrors[fieldKey] = `${label} is required`;
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted successfully:", formData);
      alert("Form submitted successfully!");
    }
    setFormData({ product_type: "Goods" });
  };

  return (
    <div className="flex justify-center items-center w-full p-3">
      <div className="w-full max-w-7xl mx-auto bg-white shadow-md border border-gray-300 rounded">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-sans">ADD PRODUCT</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            X
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4 p-6" onSubmit={handleSubmit}>
          {config.map(({ id, label, fieldKey, fieldType, disable, required }) => (
            <div key={id} className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <label className="w-1/4 text-right font-sans">{label}:</label>
                <div className="w-3/4">
                  {(() => {
                    switch (fieldType) {
                      case "input":
                        return (
                          <Input
                            value={formData[fieldKey] || ""}
                            readOnly={disable}
                            className={`border-gray-400 w-3/5 ${
                              disable ? "bg-gray-100 cursor-not-allowed" : ""
                            }`}
                            onChange={(e) => handleChange(fieldKey, e.target.value)}
                            placeholder={label}
                            disabled={disable}
                          />
                        );
                      case "select":
                        return (
                          <Select
                            id={fieldKey}
                            label={label}
                            options={options[fieldKey]?.map((opt) => opt.value) || []}
                            value={formData[fieldKey] || ""}
                            onChange={(e) => handleChange(fieldKey, e.target.value)}
                            className={`border-gray-400 w-3/5 ${
                              disable ? "bg-gray-100 cursor-not-allowed" : ""
                            }`}
                            disabled={disable}
                          />
                        );
                      default:
                        return null;
                    }
                  })()}
                </div>
              </div>
              {errors[fieldKey] && (
                <p className="text-red-500 text-sm ml-[27%]">{errors[fieldKey]}</p>
              )}
            </div>
          ))}

          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DynamicForm;
