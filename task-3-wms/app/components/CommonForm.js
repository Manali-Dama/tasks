"use client";

import React, { useState, useEffect } from "react";
import "@/app/styles/AddProduct.css";
import { useSelector } from "react-redux";
import SearchDropdown from "./SearchDropdown";

const CommonForm = ({ title, formFields, onSubmit, onProductTypeChange }) => {
  const [activeSection, setActiveSection] = useState(
    formFields.sections.find((section) => section.title === "variable")?.fields[0]?.title || ""
  );
  const [formData, setFormData] = useState({});

  const dropdowns = useSelector((state) => state.dropdowns.dropdowns);

  const handleInputChange = (e, field) => {
    const value = field.type === "boolean" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [field.field_key]: value });

    if (field.field_key === "product_type" && onProductTypeChange) {
      onProductTypeChange(value);
    }
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
        let options = dropdowns?.[field.field_key] || [];
        
        if (field.field_key === "product_return_type" && dropdowns?.product_return_details) {
          options = Object.keys(dropdowns.product_return_details);
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
      key={field.field_key || index}
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
      </div>
    </div>
  );
};

export default CommonForm;




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