import React from "react";
import "@/app/styles/Table.css";

const Table = ({ headers, data, variant = "default" }) => {
  return (
    <div className="table-container">
      <table className={`custom-table ${variant}`}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header.Label || (header.isCustom ? "Actions" : "")}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, cellIndex) => (
                  <td key={cellIndex}>
                    {header.isCustom && header.actions ? (
                      header.actions.map((action) => (
                        <button key={action.use} className="px-2">
                          <img src={action.icon} alt={action.use}  width={20}/>
                        </button>
                      ))
                    ) : (
                      row[header.fieldkey] || "--"
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length}>No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;


