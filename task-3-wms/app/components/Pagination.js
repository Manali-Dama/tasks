import React from "react";

const Pagination = ({ currentPage, lastPage, onPageChange }) => {
  return (
    <div className="pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
      <span>Page {currentPage} of {lastPage}</span>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= lastPage}>Next</button>
    </div>
  );
};


export default Pagination;
