"use client";

import React from "react";
import DynamicForm from "@/app/components/NewComponent";
import { number, string } from "prop-types";

const Page = () => {
  const config = [
    {
      id: 1,
      fieldType: "input",
      label: "Product Name*",
      fieldKey: "product_name",
      input_type: "string" ,
      required: true
    },
    {
      id: 2,
      fieldType: "select",
      label: "Product Type*",
      fieldKey: "product_type",
      required: true
    },
    {
      id: 3,
      fieldType: "input",
      label: "Wondersoft Code",
      fieldKey: "ws_code",
      disable: true
    },
    {
      id: 4,
      fieldType: "input",
      label: "Product Code",
      fieldKey: "product_code",
      disable: true
    },
    {
      id: 5,
      fieldType: "select",
      label: "Manufacturer*",
      fieldKey: "manufacturers",
      required: true
    },

    {
      id: 6,
      fieldType: "input",
      label: "MRP*",
      fieldKey: "mrp",
      required: true,
      input_type: "number"
    },
  ];

  const Options = {
    dosage: [
      { value: "low", label: "Low" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" },
    ],
    product_type: [
      { value: "Goods", label: "Goods"},
      { value: "Services", label: "Services" },
    ],
    manufacturers: [
      { value: "Manufacturer 1", label: "manufacturer_1" },
      { value: "Manufacturer 2", label: "manufacturer2" },
      { value: "Manufacturer 3", label: "manufacturer3" },
    ],
  };

  return (
    <div>
      <DynamicForm config={config} Options={Options} />
    </div>
  );
};

export default Page;
