"use client"

"use client";

import React, { useState, useEffect } from "react";

const DynamicSelectInput = ({ data }) => {
  const [selectedValues, setSelectedValues] = useState("");
  console.log(selectedValues)
 

  useEffect(() => {
    setSelectedValues(...data);
    console.log("data",data)
  }, [data]);
  console.log(selectedValues)
  const handleChange = (id, value) => {
    setSelectedValues((prev) => ({ ...prev, [id]: value }));
    console.log("(id ,value ) : " , id,value)
  };
  
  return (
    <div>
      {data.map(({ id, label, options }) => (
       
        <div key={id} className="m-10">
          <label>{label}: </label>
          <select onChange={(e) => handleChange(id, e.target.value)}>
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input className="m-3" type="text" value={selectedValues[id] || ""} readOnly />
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

