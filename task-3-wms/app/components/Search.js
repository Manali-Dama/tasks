import { useState, useEffect, useRef, useLayoutEffect } from "react";

const Search = ({ headers, filters, onSearch }) => {
  const [term, setTerm] = useState("");
  const [selectedHeader, setSelectedHeader] = useState(headers[0].fieldkey);
  const [selectedFilter, setSelectedFilter] = useState("");
  const abortControllerRef = useRef(null);

  // Handle search term changes
  const handleSearchChange = (e) => {
    setTerm(e.target.value);
  };

  // Handle header changes
  const handleHeaderChange = (e) => {
    setSelectedHeader(e.target.value);
  };

  // Handle filter selection changes
  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  // Trigger search or filter on term or filter change and cancel previous request
  useLayoutEffect(() => {
    if (!term && !selectedFilter) return; // Skip if no term or filter

    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new AbortController
    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Trigger search or filter
    onSearch(selectedHeader, term, selectedFilter);

    return () => controller.abort(); // Cleanup on unmount or term/filter change
  }, [term, selectedHeader, selectedFilter]);

  return (
    <div className="search-container">
      <input
        type="text"
        value={term}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
      <select onChange={handleHeaderChange} value={selectedHeader}>
        {headers.map((header) => (
          <option key={header.fieldkey} value={header.fieldkey}>
            {header.Label}
          </option>
        ))}
      </select>
      <select onChange={handleFilterChange} value={selectedFilter}>
        <option value="">Filter by...</option>
        {filters.map((filter, idx) => (
          <option key={idx} value={filter.value}>
            {filter.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Search;




// import { useState, useEffect, useRef } from "react";

// const Search = ({ headers, onSearch }) => {
//   const [term, setTerm] = useState("");
//   const [selectedHeader, setSelectedHeader] = useState(headers[0].fieldkey);
//   const abortControllerRef = useRef(null);

//   const handleSearchChange = (e) => {
//     setTerm(e.target.value);
//   };

//   const handleHeaderChange = (e) => {
//     setSelectedHeader(e.target.value);
//   };

//   // Trigger search on term change and cancel previous request if any
//   useEffect(() => {
//     if (!term) return; // Skip if no search term

//     // Cancel the previous request if it exists
//     if (abortControllerRef.current) {
//       abortControllerRef.current.abort();
//     }

//     // Create a new AbortController
//     const controller = new AbortController();
//     abortControllerRef.current = controller;

//     // Call onSearch with the current header and term
//     onSearch(selectedHeader, term);
    
//     return () => controller.abort(); // Cleanup on unmount or term change
//   }, [term, selectedHeader]);

//   return (
//     <div className="search-container">
//       <input
//         type="text"
//         value={term}
//         onChange={handleSearchChange}
//         placeholder="Search..."
//       />
//       <select onChange={handleHeaderChange} value={selectedHeader}>
//         {headers.map((header) => (
//           <option key={header.fieldkey} value={header.fieldkey}>
//             {header.Label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default Search;
