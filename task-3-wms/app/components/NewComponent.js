"use client"

import { useState, useEffect } from "react";

const NewComponent = ({Data}) => {

 const data=Data.data
  const [options, setOptions] = useState([]);
  const [selectedKey, setSelectedKey] = useState(""); 
  const [inputValue, setInputValue] = useState(""); 
  useEffect(() => {
   
    const extractedOptions = data.map((item) => item.field_key);
    setOptions(extractedOptions);
  },[data]);

  const handleSelectChange = (event) => {
    const selected = event.target.value;
    setSelectedKey(selected);


     const selectedItem = data.find((item) => item.field_key === selected);
    setInputValue(selectedItem ? selectedItem.value : "");

  };

  return (
    <div className="p-4 flex gap-4">
  
      <select
        className="border p-2 rounded"
        value={selectedKey}
        onChange={handleSelectChange}
      >
        <option>select a key</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <input
        type="text"
        className="border p-2 rounded"
        value={inputValue}
        placeholder="select an option"
        readOnly
      />
      </div>
  );
};

export default NewComponent;

