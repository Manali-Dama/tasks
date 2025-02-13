import { useState, useEffect } from "react";

const Search = ({ headers, onSearch, searchField, searchQuery }) => {
  const [field, setField] = useState(searchField || "");
  const [query, setQuery] = useState(searchQuery || "");

  useEffect(() => {
    setField(searchField);
    setQuery(searchQuery);
  }, [searchField, searchQuery]);

  useEffect(() => {
    if (field && query) {
      const delaySearch = setTimeout(() => {
        onSearch(field, query);
      }, 300); // Debounce search

      return () => clearTimeout(delaySearch);
    }
  }, [field, query, onSearch]);

  return (
    <div className="flex gap-2 p-4">
      <select
        className="border p-2 rounded"
        value={field}
        onChange={(e) => setField(e.target.value)}
      >
        <option value="">Select Field</option>
        {headers
          .filter((header) => header.fieldkey)
          .map((header) => (
            <option key={header.fieldkey} value={header.fieldkey}>
              {header.Label}
            </option>
          ))}
      </select>

      <input
        type="text"
        className="border p-2 rounded w-full"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={!field}
      />
    </div>
  );
};

export default Search;



// import { useState, useEffect } from "react";

// const Search = ({ headers, onSearch }) => {
//   const [searchField, setSearchField] = useState("");
//   const [query, setQuery] = useState("");

//   useEffect(() => {
//     if (searchField && query) {
//       const delaySearch = setTimeout(() => {
//         onSearch(searchField, query); // Trigger API call after delay
//       }, 200);

//       return () => clearTimeout(delaySearch); // Cleanup timeout
//     }
//   }, [searchField, query, onSearch]);

//   return (
//     <div className="flex gap-2 p-4">
//       <select
//         className="border p-2 rounded"
//         value={searchField}
//         onChange={(e) => setSearchField(e.target.value)}
//       >
//         <option value="">Select Field</option>
//         {headers
//           .filter((header) => header.fieldkey) // Only valid fields
//           .map((header) => (
//             <option key={header.fieldkey} value={header.fieldkey}>
//               {header.Label}
//             </option>
//           ))}
//       </select>

//       <input
//         type="text"
//         className="border p-2 rounded w-full"
//         placeholder="Search..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         disabled={!searchField}
//       />
//     </div>
//   );
// };

// export default Search;


// 'use client';

// import { useState } from 'react';

// const Search = ({ headers, onSearch }) => {
//   const [searchField, setSearchField] = useState('');
//   const [query, setQuery] = useState('');

//   const handleSearchChange = (e) => {
//     setQuery(e.target.value);
//     if (searchField) {
//       onSearch(searchField, e.target.value);
//     }
//   };

//   return (
//     <div className="flex gap-2 p-4">
//       <select
//         className="border p-2 rounded"
//         value={searchField}
//         onChange={(e) => setSearchField(e.target.value)}
//       >
//         <option value="">Select Field</option>
//         {headers
//           .filter((header) => header.fieldkey) // Ensure only valid headers are included
//           .map((header, index) => (
//             <option key={header.fieldkey || index} value={header.fieldkey}>
//               {header.Label}
//             </option>
//           ))}
//       </select>

//       <input
//         type="text"
//         className="border p-2 rounded w-full"
//         placeholder="Search..."
//         value={query}
//         onChange={handleSearchChange}
//         disabled={!searchField}
//       />
//     </div>
//   );
// };

// export default Search;




// import { useState, useEffect, useRef, useLayoutEffect } from "react";

// const Search = ({ headers, filters, onSearch }) => {
//   const [term, setTerm] = useState("");
//   const [selectedHeader, setSelectedHeader] = useState(headers[0].fieldkey);
//   const [selectedFilter, setSelectedFilter] = useState("");
//   const abortControllerRef = useRef(null);

//   // Handle search term changes
//   const handleSearchChange = (e) => {
//     setTerm(e.target.value);
//   };

//   // Handle header changes
//   const handleHeaderChange = (e) => {
//     setSelectedHeader(e.target.value);
//   };

//   // Handle filter selection changes
//   const handleFilterChange = (e) => {
//     setSelectedFilter(e.target.value);
//   };

//   // Trigger search or filter on term or filter change and cancel previous request
//   useLayoutEffect(() => {
//     if (!term && !selectedFilter) return; // Skip if no term or filter

//     // Cancel previous request if it exists
//     if (abortControllerRef.current) {
//       abortControllerRef.current.abort();
//     }

//     // Create a new AbortController
//     const controller = new AbortController();
//     abortControllerRef.current = controller;

//     // Trigger search or filter
//     onSearch(selectedHeader, term, selectedFilter);

//     return () => controller.abort(); // Cleanup on unmount or term/filter change
//   }, [term, selectedHeader, selectedFilter]);

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
//       <select onChange={handleFilterChange} value={selectedFilter}>
//         <option value="">Filter by...</option>
//         {filters.map((filter, idx) => (
//           <option key={idx} value={filter.value}>
//             {filter.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default Search;

// 'use client'


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
