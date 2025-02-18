"use client";

import React from "react";
import DynamicSelectInput from "@/app/components/NewComponent";

const Page = () => {
  const config = [
    {
      id: 1,
      label: "Category",
      options: ["Published", "Unpublished", "Draft"],
      selectPosition: { x: "50px", y: "100px" },
      inputPosition: { x: "200px", y: "400px" },
    },
    {
      id: 2,
      label: "is Refrigerated",
      options: ["yes", "no"],
      selectPosition: { x: "50px", y: "200px" },
      inputPosition: { x: "200px", y: "200px" },
    },
    {
      id: 3,
      label: "is Assured",
      options: ["yes", "no"],
      selectPosition: { x: "50px", y: "300px" },
      inputPosition: { x: "200px", y: "300px" },
    },
    {
      id: 4,
      label: "Manufacturer",
      options: ["Manufacturer 1", "Manufacturer 2", "Manufacturer 3"],
      selectPosition: { x: "500px", y: "30px" },
      inputPosition: { x: "200px", y: "500px" },
    },
    {
      id: 5,
      label: "Molecules",
      options: ["molecule 1", "molecule 2" , "molecule 3"],
      selectPosition: { x: "700px", y: "300px" },
      inputPosition: { x: "600px", y: "500px" },
    },
  ];

  return (
    <div>
      <DynamicSelectInput data={config} />
    </div>
  );
};

export default Page;