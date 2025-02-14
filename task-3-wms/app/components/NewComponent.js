"use client";

import { useState, useEffect } from "react";

const NewComponent = ({ Data }) => {
  const data = Data.data;
  const [options, setOptions] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [inputValues, setInputValues] = useState([]);

  useEffect(() => {
    const extractedOptions = data.map((item) => parseInt(item.field_key));
    setOptions(extractedOptions);
  }, [data]);

  const handleSelectChange = (event) => {
    const selected = parseInt(event.target.value);
    setSelectedKey(selected || null);

    if (!selected) {
      setInputValues([]); 
      return;
    }

    const selectedValues = data.slice(0, selected).map((item) => item.value || "");
    setInputValues(selectedValues);
  };


  return (
    <div className="p-4 flex flex-col gap-4">
      <select
        className="border p-2 rounded"
        value={selectedKey || ""}
        onChange={handleSelectChange}
      >
        <option value="">Select a key</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      {inputValues.length > 0 && (
        <div className="flex flex-col gap-2">
          {inputValues.map((value, index) => (
            <input
              key={index}
              type="text"
              className="border p-2 rounded"
              value={value}
              readOnly
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewComponent;





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

