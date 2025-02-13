"use client";

import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonForm from "./CommonForm";
import { fetchDropdownsRequest } from "@/store/slices/dropdownSlice";
import { form_fields as baseFormFields } from "@/data/AddProductFormJson";
import "@/app/styles/AddProduct.css";

const AddProductForm = () => {
  const dispatch = useDispatch();
  const dropdowns = useSelector((state) => state.dropdowns.dropdowns);

  useEffect(() => {
    dispatch(fetchDropdownsRequest());
  }, [dispatch]);

  const transformDropdownOptions = (key) => {
    const items = dropdowns?.[key];
    if (!Array.isArray(items)) {
      console.warn(`Expected an array for key '${key}', but got:`, items);
      return [];
    }
    return items.map((item) => ({
      field_key: item,
      label: item,
    }));
  };

  const transformedDropdowns = useMemo(() => {
    return Object.keys(dropdowns || {}).reduce((acc, key) => {
      acc[key] = transformDropdownOptions(key);
      return acc;
    }, {});
  }, [dropdowns]);

  const form_fields = {
    ...baseFormFields,
    sections: baseFormFields.sections.map((section) => ({
      ...section,
      fields: section.fields.map((field) =>
        field.type === "dropdown"
          ? { ...field, options: transformedDropdowns[field.options] || [] }
          : field
      ),
    })),
  };

  const parseBoolean = (value) => value === true || value === "true";
  const parseNumber = (value) => (isNaN(value) ? null : Number(value));

  const handleSubmit = (formData) => {
    const returnType = formData.product_return_type || "";
    const returnDetails = dropdowns?.product_return_details?.[returnType] || {};

    const formattedData = {
      product_type: formData.product_type || "",
      is_active: parseBoolean(formData.is_active),
      transaction_units: {
        purchase_unit: parseNumber(formData.purchase_unit),
        sales_unit: parseNumber(formData.sales_unit),
        transfer_unit: parseNumber(formData.transfer_unit),
      },
      is_discontinued: parseBoolean(formData.is_discontinued),
      scheduled_type_code: formData.scheduled_type_code || "",
      product_name: formData.product_name || "",
      manufacturer: formData.manufacturers || "",
      packaging_units: {
        dosage_form: formData.dosage_form || "",
        package_type: formData.package_type || "",
        uom: formData.uom || "",
        package_size: parseNumber(formData.package_size),
      },
      combination: {
        molecules: Array.isArray(formData.molecules) ? formData.molecules : [],
      },
      is_refrigerated: parseBoolean(formData.is_refrigerated),
      can_sell_online: parseBoolean(formData.can_sell_online),
      is_chronic: parseBoolean(formData.is_chronic),
      is_rx_required: parseBoolean(formData.is_rx_required),
      is_assured: parseBoolean(formData.is_assured),
      is_banned: parseBoolean(formData.is_banned),
      is_hidden_from_alternate_products: parseBoolean(formData.is_hidden_from_alternate_products),
      taxes: {
        gst_type: formData.gst_type || "",
        hsn_code: formData.hsn_code || "",
      },
      sales_category: {
        b2b_category: formData.b2b_category || "",
        sales_trend_category: formData.sales_trend_category || "",
        b2c_category: formData.b2c_category || "",
        return_type: returnType,
        ...returnDetails,
      },
      mis_reporting_category: formData.mis_reporting_category || "",
      mis_warehouse_category: formData.mis_warehouse_category || "",
    };

    dispatch({ type: "addProduct", payload: formattedData });
  };

  return <CommonForm title="Add Product" formFields={form_fields} onSubmit={handleSubmit} />;
};

export default AddProductForm;




// "use client";

// import React, { useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import CommonForm from "./CommonForm";
// import { fetchDropdownsRequest } from "@/store/slices/dropdownSlice";
// import { form_fields as baseFormFields } from "@/data/AddProductFormJson";
// import "@/app/styles/AddProduct.css";

// const AddProductForm = () => {
//   const dispatch = useDispatch();
//   const dropdowns = useSelector((state) => state.dropdowns.dropdowns);

//   useEffect(() => {
//     dispatch(fetchDropdownsRequest());
//   }, [dispatch]);

//   const transformDropdownOptions = (key) => {
//     const items = dropdowns?.[key];
//     if (!Array.isArray(items)) {
//       console.warn(`Expected an array for key '${key}', but got:`, items);
//       return [];
//     }
//     return items.map((item) => ({
//       field_key: item,
//       label: item,
//     }));
//   };

//   const transformedDropdowns = useMemo(() => {
//     return Object.keys(dropdowns || {}).reduce((acc, key) => {
//       acc[key] = transformDropdownOptions(key);
//       return acc;
//     }, {});
//   }, [dropdowns]);

//   const form_fields = {
//     ...baseFormFields,
//     sections: baseFormFields.sections.map((section) => ({
//       ...section,
//       fields: section.fields.map((field) =>
//         field.type === "dropdown"
//           ? { ...field, options: transformedDropdowns[field.options] || [] }
//           : field
//       ),
//     })),
//   };

//   const handleSubmit = (formData) => {
//     const returnType = formData.product_return_type;
//     const returnDetails = dropdowns?.product_return_details?.[returnType] || {};
  
//     const formattedData = {
//       product_type: formData.product_type,
//       is_active: formData.is_active,
//       transaction_units: {
//         purchase_unit: formData.purchase_unit,
//         sales_unit: formData.sales_unit,
//         transfer_unit: formData.transfer_unit,
//       },
//       is_discontinued: formData.is_discontinued,
//       scheduled_type_code: formData.scheduled_type_code,
//       product_name: formData.product_name,
//       manufacturer: formData.manufacturers,
//       packaging_units: {
//         dosage_form: formData.dosage_form,
//         package_type: formData.package_type,
//         uom: formData.uom,
//         package_size: formData.package_size,
//       },
//       combination: {
//         molecules: formData.molecules,
//       },
//       is_refrigerated: formData.is_refrigerated,
//       can_sell_online: formData.can_sell_online,
//       is_chronic: formData.is_chronic,
//       is_rx_required: formData.is_rx_required,
//       is_assured: formData.is_assured,
//       is_banned: formData.is_banned,
//       is_hidden_from_alternate_products: formData.is_hidden_from_alternate_products,
//       taxes: {
//         gst_type: formData.gst_type,
//         hsn_code: formData.hsn_code,
//       },
//       sales_category: {
//         b2b_category: formData.b2b_category,
//         sales_trend_category: formData.sales_trend_category,
//         b2c_category: formData.b2c_category,
//         product_return_type: returnType,
//         ...returnDetails, // Include return type details dynamically
//       },
//       mis_reporting_category: formData.mis_reporting_category,
//       mis_warehouse_category: formData.mis_warehouse_category,
//     };
  
//     dispatch({ type: "addProduct", payload: formattedData });
//   };
  

//   return <CommonForm title="Add Product" formFields={form_fields} onSubmit={handleSubmit} />;
// };

// export default AddProductForm;





// "use client"

// import React, { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createSelector } from "@reduxjs/toolkit";
// import CommonForm from "./CommonForm";
// import { fetchDropdownsRequest } from "@/store/slices/dropdownSlice";
// import { form_fields as baseFormFields } from "@/data/AddProductForm";
// import "@/app/styles/AddProduct.css";

// // Memoized selector to prevent unnecessary re-renders
// const selectDropdowns = createSelector(
//   (state) => state.dropdowns.dropdowns?.productMasterData || {},
//   (productMasterData) => productMasterData
// );

// const AddProductForm = () => {
//   const dispatch = useDispatch();
//   const dropdowns = useSelector(selectDropdowns);
//   const [selectedProductType, setSelectedProductType] = useState("");

//   useEffect(() => {
//     dispatch(fetchDropdownsRequest());
//   }, [dispatch]);

//   // Transform API response to match dropdown structure
//   const transformDropdownOptions = (key) => {
//     const items = dropdowns?.[key];

//     if (!Array.isArray(items)) {
//       console.warn(`Expected an array for key '${key}', but got:`, items);
//       return [];
//     }

//     return items.map((item) => ({
//       value: item,
//       label: item,
//     }));
//   };

//   // Memoize transformed dropdowns
//   const transformedDropdowns = useMemo(() => {
//     return Object.keys(dropdowns || {}).reduce((acc, key) => {
//       acc[key] = transformDropdownOptions(key);
//       return acc;
//     }, {});
//   }, [dropdowns]);

//   // Handle product type change
//   const handleProductTypeChange = (e) => {
//     setSelectedProductType(e.target.value);
//   };

//   // Inject transformed dropdown options into form_fields
//   const form_fields = useMemo(() => {
//     return {
//       ...baseFormFields,
//       sections: baseFormFields.sections.map((section) => {
//         // Handle product_type separately
//         if (section.title === "fixed") {
//           return {
//             ...section,
//             fields: section.fields.map((field) => {
//               if (field.field_key === "product_type") {
//                 return { ...field, options: transformedDropdowns["product_type"] || [] };
//               }
//               return field;
//             }),
//           };
//         }

//         // Filter variable fields based on product_type
//         if (section.title === "variable") {
//           return {
//             ...section,
//             fields: section.fields.filter((field) => {
//               if (selectedProductType === "Goods") return true;
//               if (selectedProductType === "Services") {
//                 return ["Classification", "GST Info", "MIS Category"].includes(field.title);
//               }
//               return false;
//             }),
//           };
//         }

//         return section;
//       }),
//     };
//   }, [baseFormFields, transformedDropdowns, selectedProductType]);

//   return (
//     <CommonForm
//       title="Add Product"
//       formFields={form_fields}
//       onSubmit={(formData) => dispatch({ type: "addProduct", payload: formData })}
//       onProductTypeChange={handleProductTypeChange}
//     />
//   );
// };

// export default AddProductForm;





// 'use client';

// import React from "react";
// import CommonForm from "./CommonForm";
// import { form_fields } from "@/data/AddProductForm";
// import "@/app/styles/AddProduct.css";

// const AddProductForm = () => {
//   const handleSubmit = (formData) => {
//     console.log("Form Submitted", formData);
//     // Handle form submission logic here
//   };

//   return <CommonForm title="Add Product" formFields={form_fields} onSubmit={handleSubmit} />;
// };

// export default AddProductForm;
