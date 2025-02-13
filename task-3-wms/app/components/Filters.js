import { useEffect, useState } from "react";
import Select from "react-select";
import api from "@/utils/axiosInstance";

const Filter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    isAssured: "",
    isRefrigerated: "",
    publish_status: "",
    manufacturer: "",
    combination: [], // ✅ Fixed key name
  });

  const [manufacturers, setManufacturers] = useState([]);
  const [molecules, setMolecules] = useState([]);

  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const response = await api.get("/master/manufacturers");
        setManufacturers(response.data.manufacturers || []);
      } catch (error) {
        console.error("Error fetching manufacturers:", error);
      }
    };

    const fetchMolecules = async () => {
      try {
        const response = await api.get("/master/molecules");
        setMolecules(response.data.molecules || []);
      } catch (error) {
        console.error("Error fetching molecules:", error);
      }
    };

    fetchManufacturers();
    fetchMolecules();
  }, []);

  // ✅ Handles both single and multi-select changes
  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  // ✅ Clears an individual filter
  const clearFilter = (name) => {
    const newFilters = { ...filters, [name]: name === "combination" ? [] : "" };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  // ✅ Clears all filters at once
  const clearAllFilters = () => {
    const resetFilters = {
      isAssured: "",
      isRefrigerated: "",
      publish_status: "",
      manufacturer: "",
      combination: [],
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="filter-container">
      {/* ✅ Display Active Filters with Clear Buttons */}
      <div className="selected-filters">
        {filters.isAssured && (
          <span className="filter-tag">
            Is Assured: {filters.isAssured}
            <button onClick={() => clearFilter("isAssured")} className="clear-btn">✖</button>
          </span>
        )}
        {filters.publish_status && (
          <span className="filter-tag">
            Status: {filters.publish_status}
            <button onClick={() => clearFilter("publish_status")} className="clear-btn">✖</button>
          </span>
        )}
        {filters.manufacturer && (
          <span className="filter-tag">
            Manufacturer: {manufacturers.find((m) => m.id === filters.manufacturer)?.name || filters.manufacturer}
            <button onClick={() => clearFilter("manufacturer")} className="clear-btn">✖</button>
          </span>
        )}
        {filters.combination.length > 0 && (
          <span className="filter-tag">
            Molecules: {filters.combination.map((id) => molecules.find((m) => m.id === id)?.name).join(", ")}
            <button onClick={() => clearFilter("combination")} className="clear-btn">✖</button>
          </span>
        )}
      </div>

      {/* ✅ Filter Select Inputs */}
      <div className="filters">
        {/* Is Assured Dropdown */}
        <select
          name="isAssured"
          onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
          value={filters.isAssured}
        >
          <option value="">Is Assured</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        {/* Status Filter */}
        <select
          name="publish_status"
          onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
          value={filters.publish_status}
        >
          <option value="">Status</option>
          <option value="Unpublished">Unpublished</option>
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>

        {/* ✅ Manufacturer Dropdown */}
        <Select
          options={manufacturers.map((m) => ({ value: m.id, label: m.name }))}
          onChange={(selectedOption) =>
            handleFilterChange("manufacturer", selectedOption ? selectedOption.value : "")
          }
          isSearchable
          value={manufacturers.find((m) => m.id === filters.manufacturer)
            ? { value: filters.manufacturer, label: manufacturers.find((m) => m.id === filters.manufacturer)?.name }
            : null}
          placeholder="Select Manufacturer"
        />

        {/* ✅ Multi-Select Molecule Dropdown */}
        <Select
          options={molecules.map((m) => ({ value: m.id, label: m.name }))}
          onChange={(selectedOptions) =>
            handleFilterChange("combination", selectedOptions.map((option) => option.value))
          }
          isMulti
          isSearchable
          value={molecules
            .filter((m) => filters.combination.includes(m.id))
            .map((m) => ({
              value: m.id,
              label: m.name,
            }))}
          placeholder="Select Molecules"
        />
      </div>

      {/* ✅ Clear All Filters Button */}
      <button onClick={clearAllFilters} className="clear-all-btn">Clear All Filters</button>

      {/* ✅ Styles (Add to your CSS or Tailwind) */}
    </div>
  );
};

export default Filter;




// import { useEffect, useState } from "react";
// import Select from "react-select";
// import api from "@/utils/axiosInstance";

// const Filter = ({ onFilterChange }) => {
//   const [filters, setFilters] = useState({
//     isAssured: "",
//     isRefrigerated:"",
//     status: "",
//     manufacturer: "",
//     combinatoion:"",
//   });

//   const [manufacturers, setManufacturers] = useState([]);
//   const [molecules, setMolecules] = useState([]);

//   useEffect(() => {
//     const fetchManufacturers = async () => {
//       try {
//         const response = await api.get("/master/manufacturers");
//         setManufacturers(response.data.manufacturers || []);
//       } catch (error) {
//         console.error("Error fetching manufacturers:", error);
//       }
//     };

  

//     fetchManufacturers();
//   }, []);

//   // ✅ Handles both native select & react-select changes
//   const handleFilterChange = (name, value) => {
//     const newFilters = { ...filters, [name]: value };
//     setFilters(newFilters);
//     onFilterChange(newFilters);
//   };

//   // ✅ Clears an individual filter
//   const clearFilter = (name) => {
//     const newFilters = { ...filters, [name]: "" };
//     setFilters(newFilters);
//     onFilterChange(newFilters);
//   };

//   // ✅ Clears all filters at once
//   const clearAllFilters = () => {
//     const resetFilters = { isAssured: "", status: "", manufacturer: "" };
//     setFilters(resetFilters);
//     onFilterChange(resetFilters);
//   };

//   return (
//     <div className="filter-container">
//       {/* ✅ Display Active Filters with Clear Buttons */}
//       <div className="selected-filters">
//         {Object.entries(filters).map(([key, value]) =>
//           value ? (
//             <span key={key} className="filter-tag">
//               {key}: {key === "manufacturer"
//                 ? manufacturers.find((m) => m.id === value)?.name || value
//                 : value}
//               <button onClick={() => clearFilter(key)} className="clear-btn">✖</button>
//             </span>
//           ) : null
//         )}
//       </div>

//       {/* ✅ Filter Select Inputs */}
//       <div className="filters">
//         {/* Is Assured Dropdown */}
//         <select
//           name="isAssured"
//           onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//           value={filters.isAssured}
//         >
//           <option value="">Is Assured</option>
//           <option value="Yes">Yes</option>
//           <option value="No">No</option>
//         </select>

//         {/* Status Filter */}
//         <select
//           name="publish_status"
//           onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//           value={filters.status}
//         >
//           <option value="">Status</option>
//           <option value="Unpublished">Unpublished</option>
//           <option value="Draft">Draft</option>
//           <option value="Published">Published</option>
//         </select>

//         {/* ✅ React-Select Manufacturer Dropdown */}
//         <Select
//           options={manufacturers.map((m) => ({ value: m.id, label: m.name }))}
//           onChange={(selectedOption) =>
//             handleFilterChange("manufacturer", selectedOption ? selectedOption.value : "")
//           }
//           isSearchable={true}
//           value={manufacturers.find((m) => m.id === filters.manufacturer) 
//                   ? { value: filters.manufacturer, label: manufacturers.find((m) => m.id === filters.manufacturer)?.name } 
//                   : null}
//           placeholder="Select Manufacturer"
//         />


//       </div>

//       {/* ✅ Clear All Filters Button */}
//       <button onClick={clearAllFilters} className="clear-all-btn">Clear All Filters</button>

//       {/* ✅ Styles (Add to your CSS or Tailwind) */}
//       {/* <style jsx>{`
//         .filter-container {
//           display: flex;
//           flex-direction: column;
//           gap: 10px;
//         }
//         .filters {
//           display: flex;
//           gap: 10px;
//         }
//         .selected-filters {
//           display: flex;
//           gap: 10px;
//           flex-wrap: wrap;
//         }
//         .filter-tag {
//           background-color: #f0f0f0;
//           padding: 5px 10px;
//           border-radius: 5px;
//           display: flex;
//           align-items: center;
//           gap: 5px;
//         }
//         .clear-btn {
//           background: none;
//           border: none;
//           color: red;
//           cursor: pointer;
//         }
//         .clear-all-btn {
//           background-color: red;
//           color: white;
//           padding: 8px 12px;
//           border: none;
//           cursor: pointer;
//           border-radius: 5px;
//         }
//       `}</style> */}
//     </div>
//   );
// };

// export default Filter;
