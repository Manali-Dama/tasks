import React from 'react'
import DynamicSelectInput from '@/app/components/NewComponent'

const page = () => {
const config = [
  { id: 1, label: "Category", options: ["Published", "Unpublished", "Draft"] },
  { id: 2, label: "is Refrigerated", options: ["yes", "no"] },
  { id: 3, label: "is Assured", options: ["yes", "no"] },
  { id: 4, label: "manufacturer", options: ["manufacturer1", "manufacturer2", "manufacturer3"] },
  { id: 5, label: "molecules", options: ["molecule1", "molecule2", "molecule3"] }
];

    return (
      <div>
       <DynamicSelectInput data={config} />
       </div>
    )
}

export default page

