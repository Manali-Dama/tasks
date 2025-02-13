// "use client";

// import React, { useState, useEffect } from "react";
// import Select from "react-select";
// import api from "@/utils/axiosInstance";

// const SearchDropdown = ({ field, value, onChange }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [options, setOptions] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (searchTerm.length > 0) {
//       fetchOptions();
//     } else {
//       setOptions([]);
//     }
//   }, [searchTerm]);

//   const fetchOptions = async () => {
//     setLoading(true);
//     try {
//       const response = await api.get("/master/manufacturers", {
//         params: { search: `${searchTerm},name`, status: "Active" },
//       });

//       setOptions(
//         response.data?.manufacturers?.map(({ id, name }) => ({
//           value: id,
//           label: name,
//         })) || []
//       );
//     } catch (error) {
//       console.error("Error fetching manufacturers:", error);
//       setOptions([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (selected) => {
//     onChange(selected ? { id: selected.value, name: selected.label } : null, field);
//   };

//   return (
//     <div className="form-group">
//       <label>
//         {field.label} {field.required && <span className="required">*</span>}
//       </label>
//       <Select
//         options={options}
//         isLoading={loading}
//         isSearchable
//         onInputChange={setSearchTerm}
//         onChange={handleChange}
//         value={value?.id ? { label: value.name, value: value.id } : null}
//         placeholder={`Search ${field.label}`}
//       />
//     </div>
//   );
// };

// export default SearchDropdown;
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Select from "react-select";
import api from "@/utils/axiosInstance";
import debounce from "lodash.debounce";

const SearchDropdown = ({ field, value, onChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const cache = useMemo(() => new Map(), []);

  const fetchOptions = useCallback(
    async (query) => {
      if (!query) return;

      if (cache.has(query)) {
        setOptions(cache.get(query));
        return;
      }

      setLoading(true);
      try {
        let response;
        if (field.field_key === "manufacturers") {
          response = await api.get("/master/manufacturers", {
            params: { search: `${query},name`, status: "Active" },
          });
        } else if (field.field_key === "b2c_category") {
          response = await api.get("/master/b2c-template", {
            params: { search: `${query},category_name`, status: "Active" },
          });
        } else if (field.field_key === "molecules") {
          response = await api.get("/master/molecules", {
            params: { search: `${query},name` }, // Updated query parameter for molecules
          });
        }

        console.log(`API Response (${field.field_key}):`, response?.data);

        const newOptions =
          field.field_key === "b2c_category"
            ? response?.data?.b2cPricing || []
            : field.field_key === "molecules"
            ? response?.data?.molecules || []
            : response?.data?.[field.field_key] || [];

        const formattedOptions = newOptions.map(({ id, category_name, name }) => ({
          value: id,
          label: category_name || name, // Use category_name for b2c_category
        }));

        cache.set(query, formattedOptions);
        setOptions(formattedOptions);
      } catch (error) {
        console.error(`Error fetching ${field.field_key} data:`, error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    },
    [cache, field.field_key]
  );

  const debouncedFetchOptions = useMemo(() => debounce(fetchOptions, 300), [fetchOptions]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      debouncedFetchOptions(searchTerm);
    } else {
      setOptions([]);
    }

    return () => debouncedFetchOptions.cancel();
  }, [searchTerm, debouncedFetchOptions]);

  const handleChange = (selected) => {
    if (field.field_key === "b2c_category") {
      onChange(selected ? selected.value : null, field); // Return only ID
    } else if (field.field_key === "molecules") {
      onChange(selected ?  [selected.value]  : { molecules: [] }, field); // Send as array
    } else {
      onChange(selected ? { id: selected.value, name: selected.label } : null, field);
    }
  };

  return (
    <div className="form-group">
      <label>
        {field.label} {field.required && <span className="required">*</span>}
      </label>
      <Select
        options={options}
        isLoading={loading}
        isSearchable
        onInputChange={(input) => {
          if (input !== searchTerm) setSearchTerm(input);
        }}
        onChange={handleChange}
        value={
          field.field_key === "b2c_category"
            ? options.find((option) => option.value === value) || null
            : field.field_key === "molecules"
            ? options.find((option) => option.value === value?.molecules?.[0]) || null
            : options.find((option) => option.value === value?.id) || null
        }
        placeholder={`Search ${field.label}`}
        noOptionsMessage={() => (loading ? "Loading..." : "No results found")}
      />
    </div>
  );
};

export default SearchDropdown;





// "use client";

// import React, { useState, useEffect } from "react";
// import api from "@/utils/axiosInstance"; // Import Axios instance

// const SearchDropdown = ({ field, value, onChange }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [options, setOptions] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (searchTerm.length > 2) {
//       fetchOptions();
//     } else {
//       setOptions([]);
//     }
//   }, [searchTerm]);

//   const fetchOptions = async () => {
//     setLoading(true);
//     try {
//       const response = await api.get(`/master/${field.options}`, {
//         params: {
//           search: searchTerm + ",name",
//           status: "Active",
//         },
//       });
//       console.log(response);

//       setOptions(response.data?.manufacturers.map((item) => item.name) || []);
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//       setOptions([]);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="form-group search-dropdown">
//       <label>
//         {field.label} {field.required && <span className="required">*</span>}
//       </label>
//       <input
//         type="text"
//         className="form-input"
//         placeholder={`Search ${field.label}`}
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       {loading && <div className="loading-text">Loading...</div>}
//       {options.length > 0 && (
//         <ul className="dropdown-list">
//           {options.map((option, index) => (
//             <li
//               key={index}
//               className="dropdown-item"
//               onClick={() => {
//                 onChange({ target: { value: option } }, field); // Fix onChange event
//                 setSearchTerm(option); // Set selected value
//                 setOptions([]); // Hide dropdown
//               }}
//             >
//               {option}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SearchDropdown;
