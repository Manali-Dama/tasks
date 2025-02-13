import React from 'react'
import { Breadcrumbs } from '@/app/components/Breadcrumbs'
import AddProductForm from '@/app/components/AddProductForm'

const page = () => {
  return (
    <div>
            <Breadcrumbs
        paths={[
          { name: "Home", link: "/" },
          { name: "Product Master", link: "/product-master" },
          { name: "Add Product", link:"/product-master/add-product" }
        ]}
      />
      <AddProductForm />
    </div>
  )
}

export default page
