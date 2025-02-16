"use client"

import React, { useState } from "react";

const config = [
  { id: 1, label: "Category", options: ["Electronics", "Clothing", "Books"] },
  { id: 2, label: "Brand", options: ["Apple", "Samsung", "Sony"] },
  { id: 3, label: "Color", options: ["Red", "Blue", "Green"] }
];

const DynamicSelectInput = () => {
  const [selectedValues, setSelectedValues] = useState(
    config.reduce((acc, item) => ({ ...acc, [item.id]: "" }), {})
  );

  const handleChange = (id, value) => {
    setSelectedValues((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div>
      {config.map(({ id, label, options }) => (
        <div key={id} style={{ marginBottom: "10px" }}>
          <label>{label}: </label>
          <select onChange={(e) => handleChange(id, e.target.value)}>
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input type="text" value={selectedValues[id]} readOnly />
        </div>
      ))}
    </div>
  );
};

export default DynamicSelectInput;






// "use client"

// import { useState, useEffect } from "react";

// const NewComponent = ({Data}) => {

//  const data=Data.data
//   const [options, setOptions] = useState([]);
//   const [selectedKey, setSelectedKey] = useState(null); 
//   const [inputValue, setInputValue] = useState(""); 
//   useEffect(() => {
   
//     const extractedOptions = data.map((item) => item.field_key);
//     setOptions(extractedOptions);
//   },[data]);

//   const handleSelectChange = (event) => {
//     const selected = event.target.value;
//     setSelectedKey(selected);


//      const selectedItem = data.find((item) => item.field_key === selected);
//     setInputValue(selectedItem ? selectedItem.value : "");

//   };

//   return (
//     <div className="p-4 flex gap-4">
  
//       <select
//         className="border p-2 rounded"
//         value={selectedKey}
//         onChange={handleSelectChange}
//       >
//         <option>select a key</option>
//         {options.map((option, index) => (
//           <option key={index} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>

//       <input
//         type="text"
//         className="border p-2 rounded"
//         value={inputValue}
//         placeholder="select an option"
//         readOnly
//       />
//       </div>
//   );
// };

// export default NewComponent;

