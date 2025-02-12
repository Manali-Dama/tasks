import React from 'react'
import { Breadcrumbs } from '@/app/components/Breadcrumbs'
import AddProductForm from '@/app/components/AddProductForm'

const page = () => {
  return (
    <div>
        <Breadcrumbs paths={[{ name: "Home", link: "/" }, { name: "Product Master"},{ name: "Add Product"}]} />
      <AddProductForm />
    </div>
  )
}

export default page
