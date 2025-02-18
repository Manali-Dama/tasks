"use client";

import React, { useState, useEffect } from "react";
import Select from "./Select";
import Input from "./Input";

const DynamicSelectInput = ({ data }) => {
  const [selectedValues, setSelectedValues] = useState({});

  useEffect(() => {
    const initialValues = data.reduce((acc, { id }) => {
      acc[id] = "";
      return acc;
    }, {});
    setSelectedValues(initialValues);
  }, [data]);

  const handleChange = (id, value) => {
    setSelectedValues((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="relative w-full h-screen">
      {data.map(({ id, label, options, selectPosition, inputPosition }) => (
        <div key={id}>
          <div
            className="absolute"
            style={{
              left: selectPosition?.x || 0,
              top: selectPosition?.y || 0,
            }}
          >
            <Select
              id={id}
              label={label}
              options={options}
              value={selectedValues[id] || ""}
              onChange={(e) => handleChange(id, e.target.value)}
            />
          </div>
          <div
            className="absolute w-64"
            style={{
              left: inputPosition?.x || 0,
              top: inputPosition?.y || 0,
            }}
          >
            <Input value={`${label} : ${selectedValues[id] || ""}`} readOnly />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DynamicSelectInput;



// "use client";

// import React, { useState, useEffect } from "react";

// const DynamicSelectInput = ({ data }) => {
//   const [selectedValues, setSelectedValues] = useState({});

//   useEffect(() => {
//     const initialValues = data.reduce((acc, { id }) => ({ ...acc, [id]: "" }), {});
//     setSelectedValues(initialValues);
//   }, [data]);

//   const handleChange = (id, value) => {
//     setSelectedValues((prev) => ({ ...prev, [id]: value }));
//   };

//   return (
//     <div>
//       {data.map(({ id, label, options, position }) => (
//         <div key={id} className="m-10 flex items-center gap-4">
//           {position === "input-first" && (
//             <input
//               className="border p-2"
//               type="text"
//               value={selectedValues[id] || ""}
//               readOnly
//             />
//           )}
//           <select
//             onChange={(e) => handleChange(id, e.target.value)}
//             className="border-2 border-black p-2"
//           >
//             <option value="">Select {label}</option>
//             {options.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//           {position === "select-first" && (
//             <input
//               className="border p-2"
//               type="text"
//               value={selectedValues[id] || ""}
//               readOnly
//             />
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DynamicSelectInput;

