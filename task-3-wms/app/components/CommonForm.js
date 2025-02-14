"use client";

import React, { useState, useEffect } from "react";
import "@/app/styles/AddProduct.css";
import { useSelector } from "react-redux";
import SearchDropdown from "./SearchDropdown";


const CommonForm = ({ title, formFields, onSubmit, initialData = {} }) => {
  const [activeSection, setActiveSection] = useState(
    formFields.sections.find((section) => section.title === "variable")?.fields[0]?.title || ""
  );
  const [formData, setFormData] = useState(initialData);                           
  const dropdowns = useSelector((state) => state.dropdowns.dropdowns);

  const productReturnOptions = dropdowns?.product_return_type || [];
  const productReturnDetails = dropdowns?.product_return_details || {};

  // useEffect(() => {
  //   setFormData(initialData);
  // }, [initialData]);

  const handleInputChange = (e, field) => {
    const value = e && e.target ? (field.type === "boolean" ? e.target.checked : e.target.value) : e;
    setFormData((prevData) => ({ ...prevData, [field.field_key]: value }));
  };

  const renderField = (field, index) => {
    if (!field) return null;

    switch (field.type) {
      case "input":
        return (
          <div className="form-group items-stretch" key={field.field_key || index}>
            <label>
              {field.label} {field.required && <span className="required">*</span>}
            </label>
            <input
              type="text"
              className="form-input"
              required={field.required}
              value={formData[field.field_key] || ""}
              onChange={(e) => handleInputChange(e, field)}
            />
          </div>
        );
      case "dropdown":
        let options = dropdowns?.[field.field_key] || ["yes", "no"];

        if (field.field_key === "product_return_type") {
          options = productReturnOptions;
        }

        return (
          <div className="form-group" key={field.field_key || index}>
            <label>
              {field.label} {field.required && <span className="required">*</span>}
            </label>
            <select
              className="form-input"
              required={field.required}
              value={formData[field.field_key] || ""}
              onChange={(e) => handleInputChange(e, field)}
            >
              <option value="">Select {field.label}</option>
              {options.map((option, i) => (
                <option key={`${field.field_key}-${i}`} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      case "search-dropdown":
        return (
          <SearchDropdown
            key={field.options || index}
            field={field}
            value={formData[field.field_key] || ""}
            onChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">{title}</h2>
        <form className="text-right" onSubmit={handleSubmit}>
          {formFields.sections.find((section) => section.title === "fixed")?.fields.map(renderField)}
          <div className="menu-bar">
            {formFields.sections
              .find((section) => section.title === "variable")
              ?.fields.map((section) => (
                <button
                  key={section.title}
                  className={`menu-button ${activeSection === section.title ? "active" : ""}`}
                  onClick={() => setActiveSection(section.title)}
                  type="button"
                >
                  {section.title}
                </button>
              ))}
          </div>
          {formFields.sections
            .find((section) => section.title === "variable")
            ?.fields.filter((sec) => sec.title === activeSection)
            .flatMap((sec) => sec.fields.map(renderField))}
          <button type="submit" className="submit-button">Save</button>
        </form>

        {formData.product_return_type && productReturnDetails[formData.product_return_type] && (
          <div className="return-table-container">
            <h3>Return Type Details</h3>
            <table className="return-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Days</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(productReturnDetails[formData.product_return_type]).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key.replace("_", " ")}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonForm;



// "use client";

// import React, { useState } from "react";
// import "@/app/styles/AddProduct.css";
// import { useSelector } from "react-redux";
// import SearchDropdown from "./SearchDropdown";

// const CommonForm = ({ title, formFields, onSubmit }) => {
//   const [activeSection, setActiveSection] = useState(
//     formFields.sections.find((section) => section.title === "variable")?.fields[0]?.title || ""
//   );
//   const [formData, setFormData] = useState({});                           
//   const dropdowns = useSelector((state) => state.dropdowns.dropdowns);

//   // Extract product return type details from Redux state
//   const productReturnOptions = dropdowns?.product_return_type || [];
//   const productReturnDetails = dropdowns?.product_return_details || {};
//   const handleInputChange = (e, field) => {
//     const value = e && e.target ? (field.type === "boolean" ? e.target.checked : e.target.value) : e;
//     setFormData({ ...formData, [field.field_key]: value });
//   };
  

//   const renderField = (field, index) => {
//     if (!field) return null;

//     switch (field.type) {
//       case "input":
//         return (
//           <div className="form-group items-stretch" key={field.field_key || index}>
//             <label>
//               {field.label} {field.required && <span className="required">*</span>}
//             </label>
//             <input
//               type="text"
//               className="form-input"
//               required={field.required}
//               value={formData[field.field_key] || ""}
//               onChange={(e) => handleInputChange(e, field)}
//             />
//           </div>
//         );
//       case "dropdown":
//         let options = dropdowns?.[field.field_key] || ["yes","no"];

//         if (field.field_key === "product_return_type") {
//           options = productReturnOptions; // Use return type options from backend
//         }

//         return (
//           <div className="form-group" key={field.field_key || index}>
//             <label>
//               {field.label} {field.required && <span className="required">*</span>}
//             </label>
//             <select
//               className="form-input"
//               required={field.required}
//               value={formData[field.field_key] || ""}
//               onChange={(e) => handleInputChange(e, field)}
//             >
//               <option value="">Select {field.label}</option>
//               {options.map((option, i) => (
//                 <option key={`${field.field_key}-${i}`} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//         );
//       case "search-dropdown":
//         return (
//           <SearchDropdown
//             key={field.options || index}
//             field={field}
//             value={formData[field.field_key] || ""}
//             onChange={handleInputChange}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <div className="form-container">
//       <div className="form-card">
//         <h2 className="form-title">{title}</h2>
//         <form className="text-right" onSubmit={handleSubmit}>
//           {formFields.sections.find((section) => section.title === "fixed")?.fields.map(renderField)}
//           <div className="menu-bar">
//             {formFields.sections
//               .find((section) => section.title === "variable")
//               ?.fields.map((section) => (
//                 <button
//                   key={section.title}
//                   className={`menu-button ${activeSection === section.title ? "active" : ""}`}
//                   onClick={() => setActiveSection(section.title)}
//                   type="button"
//                 >
//                   {section.title}
//                 </button>
//               ))}
//           </div>
//           {formFields.sections
//             .find((section) => section.title === "variable")
//             ?.fields.filter((sec) => sec.title === activeSection)
//             .flatMap((sec) => sec.fields.map(renderField))}
//           <button type="submit" className="submit-button">Save</button>
//         </form>

//         {/* Table Displaying Return Values */}
//         {formData.product_return_type && productReturnDetails[formData.product_return_type] && (
//           <div className="return-table-container">
//             <h3>Return Type Details</h3>
//             <table className="return-table">
//               <thead>
//                 <tr>
//                   <th>Type</th>
//                   <th>Days</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Object.entries(productReturnDetails[formData.product_return_type]).map(([key, value]) => (
//                   <tr key={key}>
//                     <td>{key.replace("_", " ")}</td>
//                     <td>{value}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CommonForm;



// "use client";

// import React, { useState, useEffect } from "react";
// import "@/app/styles/AddProduct.css";
// import { useSelector } from "react-redux";
// import SearchDropdown from "./SearchDropdown";

// const CommonForm = ({ title, formFields, onSubmit, onProductTypeChange }) => {
//   const [activeSection, setActiveSection] = useState(
//     formFields.sections.find((section) => section.title === "variable")?.fields[0]?.title || ""
//   );
//   const [formData, setFormData] = useState({});
//   const dropdowns = useSelector((state) => state.dropdowns.dropdowns);

//   const handleInputChange = (value, field) => {
//     let updatedValue = value;

//     // Ensure Manufacturer is stored as { id, name }
//     if (field.field_key === "manufacturers") {
//       updatedValue = value ? { id: value.id, name: value.name } : null;
//       console.log(updatedValue)
//     }

//     setFormData((prevData) => ({
//       ...prevData,
//       [field.field_key]: updatedValue,
//     }));

//     if (field.field_key === "product_type" && onProductTypeChange) {
//       onProductTypeChange(updatedValue);
//     }
//   };

//   const renderField = (field, index) => {
//     if (!field) return null;

//     switch (field.type) {
//       case "input":
//         return (
//           <div className="form-group items-stretch" key={field.field_key || index}>
//             <label>
//               {field.label} {field.required && <span className="required">*</span>}
//             </label>
//             <input
//               type="text"
//               className="form-input"
//               required={field.required}
//               value={formData[field.field_key] || ""}
//               onChange={(e) => handleInputChange(e.target.value, field)}
//             />
//           </div>
//         );

//       case "dropdown":
//         let options = dropdowns?.[field.field_key] || ["yes", "no"];

//         if (field.field_key === "product_return_type" && dropdowns?.product_return_details) {
//           options = Object.keys(dropdowns.product_return_details);
//         }

//         return (
//           <div className="form-group" key={field.field_key || index}>
//             <label>
//               {field.label} {field.required && <span className="required">*</span>}
//             </label>
//             <select
//               className="form-input"
//               required={field.required}
//               value={formData[field.field_key] || ""}
//               onChange={(e) => handleInputChange(e.target.value, field)}
//             >
//               <option value="">Select {field.label}</option>
//               {options.map((option, i) => (
//                 <option key={`${field.field_key}-${i}`} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//         );

//       case "search-dropdown":
//         return (
//           <SearchDropdown
//             key={field.field_key || index}
//             field={field}
//             value={formData[field.field_key] || ""}
//             onChange={handleInputChange}
//           />
//         );

//       default:
//         return null;
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <div className="form-container">
//       <div className="form-card">
//         <h2 className="form-title">{title}</h2>
//         <form className="text-right" onSubmit={handleSubmit}>
//           {formFields.sections.find((section) => section.title === "fixed")?.fields.map(renderField)}
//           <div className="menu-bar">
//             {formFields.sections
//               .find((section) => section.title === "variable")
//               ?.fields.map((section) => (
//                 <button
//                   key={section.title}
//                   className={`menu-button ${activeSection === section.title ? "active" : ""}`}
//                   onClick={() => setActiveSection(section.title)}
//                   type="button"
//                 >
//                   {section.title}
//                 </button>
//               ))}
//           </div>
//           {formFields.sections
//             .find((section) => section.title === "variable")
//             ?.fields.filter((sec) => sec.title === activeSection)
//             .flatMap((sec) => sec.fields.map(renderField))}
//           <button type="submit" className="submit-button">Save</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CommonForm;






// "use client";

// import React, { useState } from "react";
// import "@/app/styles/AddProduct.css";

// const CommonForm = ({ title, formFields, dropdowns, onSubmit }) => {
//   const [activeSection, setActiveSection] = useState(
//     formFields.sections.find((section) => section.title === "variable")?.fields[0]?.title || ""
//   );
//   const [formData, setFormData] = useState({});

//   const handleInputChange = (e, field) => {
//     const value = field.type === "boolean" ? e.target.checked : e.target.value;
//     setFormData({ ...formData, [field.field_key]: value });
//   };

//   const renderField = (field) => {
//     switch (field.type) {
//       case "input":
//         return (
//           <div className="form-group" key={field.field_key}>
//             <label>
//               {field.label} {field.required && <span className="required"></span>}
//             </label>
//             <input
//               type="text"
//               className="form-input"
//               required={field.required}
//               onChange={(e) => handleInputChange(e, field)}
//             />
//           </div>
//         );

//       case "dropdown":
//         // If dropdowns[field.field_key] exists, use it; otherwise, default to Yes/No
//         const options = (dropdowns && dropdowns[field.field_key]) || [
//             { value: "yes", label: "Yes" },
//             { value: "no", label: "No" },
//           ];
          

//         return (
//           <div className="form-group" key={field.field_key}>
//             <label>
//               {field.label} {field.required && <span className="required"></span>}
//             </label>
//             <select className="form-input" required={field.required} onChange={(e) => handleInputChange(e, field)}>
//               <option value="">Select {field.label}</option>
//               {options.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         );

//       case "button":
//         return (
//           <button key={field.label} className="menu-button">
//             {field.label}
//           </button>
//         );

//       default:
//         return null;
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <div className="form-container">
//       <div className="form-card">
//         <h2 className="form-title">{title}</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Fixed Section Fields */}
//           {formFields.sections
//             .find((section) => section.title === "fixed")
//             ?.fields.map(renderField)}

//           {/* Variable Sections Menu */}
//           <div className="menu-bar">
//             {formFields.sections
//               .find((section) => section.title === "variable")
//               ?.fields.map((section) => (
//                 <button
//                   key={section.title}
//                   className={`menu-button ${activeSection === section.title ? "active" : ""}`}
//                   onClick={() => setActiveSection(section.title)}
//                   type="button"
//                 >
//                   {section.title}
//                 </button>
//               ))}
//           </div>

//           {/* Dynamic Section Fields */}
//           {formFields.sections
//             .find((section) => section.title === "variable")
//             ?.fields.filter((sec) => sec.title === activeSection)
//             .flatMap((sec) => sec.fields.map(renderField))}

//           <button type="submit" className="submit-button">
//             Save
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CommonForm;







// 'use client';

// import React, { useState } from "react";
// import "@/app/styles/AddProduct.css";

// const CommonForm = ({ title, formFields, dropdowns, onSubmit }) => {
//   const [activeSection, setActiveSection] = useState(
//     formFields.sections.find((section) => section.title === "variable")?.fields[0]?.title || ""
//   );
//   const [formData, setFormData] = useState({});

//   const handleInputChange = (e, field) => {
//     const value = field.type === "boolean" ? e.target.checked : e.target.value;
//     setFormData({ ...formData, [field.field_key]: value });
//   };

//   const renderField = (field) => {
//     switch (field.type) {
//       case "input":
//         return (
//           <div className="form-group" key={field.field_key}>
//             <label>
//               {field.label} {field.required && <span className="required"></span>}
//             </label>
//             <input
//               type="text"
//               className="form-input"
//               required={field.required}
//               onChange={(e) => handleInputChange(e, field)}
//             />
//           </div>
//         );
//       case "dropdown":
//         return (
//           <div className="form-group" key={field.field_key}>
//             <label>
//               {field.label} {field.required && <span className="required"></span>}
//             </label>
//             <select
//               className="form-input"
//               required={field.required}
//               onChange={(e) => handleInputChange(e, field)}
//             >
//               <option value="">Select {field.label}</option>
//               {field.options?.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         );
//       case "boolean":
//         return (
//           <div className="form-group" key={field.field_key}>
//             <label>
//               <input
//                 type="checkbox"
//                 onChange={(e) => handleInputChange(e, field)}
//               />
//               {field.label} {field.required && <span className="required"></span>}
//             </label>
//           </div>
//         );
//       case "button":
//         return (
//           <button key={field.label} className="menu-button">
//             {field.label}
//           </button>
//         );
//       default:
//         return null;
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <div className="form-container">
//       <div className="form-card">
//         <h2 className="form-title">{title}</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Fixed Section Fields */}
//           {formFields.sections
//             .find((section) => section.title === "fixed")
//             ?.fields.map(renderField)}

//           {/* Variable Sections Menu */}
//           <div className="menu-bar">
//             {formFields.sections
//               .find((section) => section.title === "variable")
//               ?.fields.map((section) => (
//                 <button
//                   key={section.title}
//                   className={`menu-button ${activeSection === section.title ? "active" : ""}`}
//                   onClick={() => setActiveSection(section.title)}
//                   type="button"
//                 >
//                   {section.title}
//                 </button>
//               ))}
//           </div>

//           {/* Dynamic Section Fields */}
//           {formFields.sections
//             .find((section) => section.title === "variable")
//             ?.fields.filter((sec) => sec.title === activeSection)
//             .flatMap((sec) => sec.fields.map(renderField))}

//           <button type="submit" className="submit-button">Save</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CommonForm;