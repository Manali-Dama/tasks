'use client';

import { useSelector } from 'react-redux';
import { useState } from 'react';

// Recursive component to handle the toggle of JSON objects and arrays
const JsonToggle = ({ data, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false); 

  const toggle = () => setIsOpen(!isOpen);

  if (typeof data !== 'object' || data === null) {
    // If data is a string, remove the quotes for display
    return <span>{typeof data === 'string' ? data.replace(/\"/g, '') : data}</span>;
  }

  const isArray = Array.isArray(data);
  const keys = isArray ? data.map((_, index) => index) : Object.keys(data);

  return (
    <div style={{ marginLeft: `${level * 15}px` }}>
      <span onClick={toggle} style={{ cursor: 'pointer', color: 'blue' }}>
        {isOpen ? '[-]' : '[+]'}
      </span>
      <span>{isArray ? '[' : ''}</span> {/* Display opening bracket */}
      {isOpen && (
        <div>
          {isArray
            ? data.map((item, index) => (
                <div key={index}>
                  <JsonToggle data={item} level={level + 1} />
                </div>
              ))
            : keys.map((key) => (
                <div key={key}>
                  <strong>{key}:</strong>
                  <JsonToggle data={data[key]} level={level + 1} />
                </div>
              ))}
        </div>
      )}
      {isOpen && <span>{isArray ? ']' : ''}</span>} {/* Display closing bracket */}
    </div>
  );
};

const DisplayJsonComponent = () => {

  const { parsedJson = null, error = null } = useSelector((state) => state.json);

  return (
    <div className="display-json">
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <pre>
          {parsedJson ? (
            <JsonToggle data={parsedJson} />
          ) : (
            'Parsed JSON will appear here'
          )}
        </pre>
      )}
    </div>
  );
};

export default DisplayJsonComponent;
