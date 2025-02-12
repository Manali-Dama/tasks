"use client";

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "@/store/slices/productsSlice";
import Table from "@/app/components/Table"; 
import "@/app/globals.css";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import Filter from "@/app/components/Filters";
import api from "@/utils/axiosInstance"; 
import Button from "@/app/components/Button";
import {useRouter} from "next/navigation";
import productData from "@/data/productData"; // Import headers from JSON file

const ProductMaster = () => {
  const dispatch = useDispatch();
  const { products, loading, error, current_page, last_page } = useSelector(
    (state) => state.products
  );

  const router=useRouter();

  const [filters, setFilters] = useState({
    isAssured: "",
    isRefrigerated: "",
    status: "",
    combinations: "",
    manufacturer: "",
  });

  const abortControllerRef = useRef(null);

  useEffect(() => { 
    dispatch(fetchProductsStart({ page: current_page }));
  }, [dispatch, current_page]);

  const nextPage = () => {
    if (current_page < last_page) {
      dispatch(fetchProductsStart({ page: current_page + 1 }));
    }
  };

  const prevPage = () => {
    if (current_page > 1) {
      dispatch(fetchProductsStart({ page: current_page - 1 }));
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters); 
    fetchFilteredProducts(newFilters);
  };

  const fetchFilteredProducts = (newFilters) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    let query = "";
    Object.keys(newFilters).forEach(key => {
      if (newFilters[key]) {
        query += `&${key}=${encodeURIComponent(newFilters[key])}`;
      }
    });

    api.get(`/master/products/unpublished?${query}`, { signal: controller.signal })
      .then((response) => {
        dispatch(fetchProductsStart({ 
          products: response.data.products,
          current_page: response.data.meta.current_page,
          last_page: response.data.meta.last_page,
        }));
      })
      .catch((error) => {
        console.error("Error fetching filtered products:", error);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
    <div className="flex justify-between">
      <Breadcrumbs paths={[{ name: "Home", link: "/" }, { name: "Product Master" }]} />
      <Button
  onClick={() => {
    router.push("/product-master/add-product");
  }}
>
  + Add
</Button>
</div>
      <div className="py-3">
        <div className="bg-white mt-3">
          <h1>Unpublished Products</h1>
          <Filter onFilterChange={handleFilterChange} />
          <Table headers={productData.headers} data={products} variant="products" />
          <div className="pagination">
            <button onClick={prevPage} disabled={current_page === 1}>Previous</button>
            <span>Page {current_page} of {last_page}</span>
            <button onClick={nextPage} disabled={current_page >= last_page}>Next</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductMaster;



// "use client";

// import { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProductsSuccess, fetchProductsFailure } from "@/store/slices/productsSlice";
// import Table from "@/app/components/Table";
// import "@/app/globals.css";
// import { Breadcrumbs } from "@/app/components/Breadcrumbs";
// import Filter from "@/app/components/Filters";
// import api from "@/utils/axiosInstance";
// import Button from "@/app/components/Button";
// import { useRouter } from "next/navigation";
// import productData from "@/data/productData";
// import Pagination from "@/app/components/Pagination";

// const ProductMaster = () => {
//   const dispatch = useDispatch();
//   const { products, loading, error, current_page, last_page } = useSelector(
//     (state) => state.products
//   );
  
//   const router = useRouter();
//   const [filters, setFilters] = useState({
//     isAssured: "",
//     isRefrigerated: "",
//     status: "",
//     combination: "",
//     manufacturer: "",
//   });
//   const [page, setPage] = useState(1);

//   const abortControllerRef = useRef(null);

//   useEffect(() => {
//     fetchFilteredProducts(filters, page);
//   }, [filters, page]);

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//     setPage(1);
//   };

//     const nextPage = () => {
//     if (current_page < last_page) {
//       dispatch(fetchProductsStart({ page: current_page + 1 }));
//     }
//   };

//   const prevPage = () => {
//     if (current_page > 1) {
//       dispatch(fetchProductsStart({ page: current_page - 1 }));
//     }
//   };

//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };

//   const fetchFilteredProducts = async (newFilters, page) => {
//     if (abortControllerRef.current) {
//       abortControllerRef.current.abort();
//     }

//     const controller = new AbortController();
//     abortControllerRef.current = controller;

//     try {
//       const params = new URLSearchParams();
//       if (newFilters.isAssured) params.append("is_assured", newFilters.isAssured);
//       if (newFilters.isRefrigerated) params.append("is_refrigerated", newFilters.isRefrigerated);
//       if (newFilters.status) params.append("publish_status", newFilters.status);
//       if (newFilters.manufacturer) params.append("manufacturer", newFilters.manufacturer);
//       if (newFilters.combination) params.append("combination", newFilters.combination);
      
//       params.append("sort_by", "created,d");
//       params.append("page", page);

//       const response = await api.get(`/master/products/unpublished?${params.toString()}`, { signal: controller.signal });
//       dispatch(fetchProductsSuccess({ 
//         products: response.data.products, 
//         current_page: response.data.meta.current_page, 
//         last_page: response.data.meta.last_page 
//       }));
//     } catch (error) {
//       dispatch(fetchProductsFailure(error.message));
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <>
//       <div className="flex justify-evenly">
//         <Breadcrumbs paths={[{ name: "Home", link: "/" }, { name: "Product Master" }]} />
//         <Button onClick={() => router.push("/product-master/add-product")}>+ Add</Button>
//       </div>
//       <div className="py-3">
//         <div className="bg-white mt-3">
//           <h1>Unpublished Products</h1>
//           <Filter onFilterChange={handleFilterChange} />
//           <Table headers={productData.headers} data={products} variant="products" />
//           {products.length > 10 && (
//             <div className="pagination">
//             <Button onClick={prevPage} disabled={current_page === 1}>Previous</Button>
//             <span>Page {current_page} of {last_page}</span>
//             <button onClick={nextPage} disabled={current_page >= last_page}>Next</button>
//           </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductMaster;






// "use client";

// import { useState } from "react";
// import { Breadcrumbs } from "@/app/components/Breadcrumbs";
// import Filter from "@/app/components/Filters";
// import ProductTable from "@/app/components/ProductTable";

// const ProductMaster = () => {
//   const [filters, setFilters] = useState({
//     isAssured: "",
//     isRefrigerated: "",
//     status: "",
//     combinations: "",
//     manufacturer: "",
//   });

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//   };

//   return (
//     <div className="py-3">
//       <Breadcrumbs paths={[{ name: "Home", link: "/" }, { name: "Product Master" }]} />

//       <div className="bg-white mt-3">
//         <h1>Unpublished Products</h1>

//         <Filter onFilterChange={handleFilterChange} />  
//         <ProductTable onFilterChange={handleFilterChange} />  
//       </div>
//     </div>
//   );
// };

// export default ProductMaster;






// "use client"

// import { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProductsStart } from "@/store/slices/productsSlice";
// import Table from "@/app/components/Table"; 
// import "@/app/globals.css";
// import { Breadcrumbs } from "@/app/components/Breadcrumbs";


// const ProductMaster = () => {
//   const dispatch = useDispatch();
//   const { products, loading, error, current_page, last_page } = useSelector(
//     (state) => state.products
//   );

//   const abortControllerRef = useRef(null); // To hold the AbortController reference

//   useEffect(() => {
//     dispatch(fetchProductsStart({ page: current_page }));
//   }, [dispatch, current_page]);

//   const nextPage = () => {
//     if (current_page < last_page) {
//       dispatch(fetchProductsStart({ page: current_page + 1 }));
//     }
//   };

//   const prevPage = () => {
//     if (current_page > 1) {
//       dispatch(fetchProductsStart({ page: current_page - 1 }));
//     }
//   };

//   const handleSearch = (header, term) => {
//     // Cancel previous request
//     if (abortControllerRef.current) {
//       abortControllerRef.current.abort();
//     }

//     // Create a new AbortController
//     const controller = new AbortController();
//     abortControllerRef.current = controller;

//     // Dispatch action without the signal, handle it locally
//   //   dispatch(fetchProductsStart({ 
//   //     url: `https://i-stage.mkwms.dev/api/v1/master/products/unpublished?${searchQuery}`,
//   //     controller, // Pass the controller to handle cancellation within the action
//   //   }));
//   // };

//   dispatch(fetchProductsStart({ 
//     url: `https://i-stage.mkwms.dev/api/v1/master/products/unpublished?$`,
//     controller, // Pass the controller to handle cancellation within the action
//   }));
// };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   const headers = [
//     {Label:"Product Code", fieldkey:"product_code"},
//     {Label:"Wondersoft Code", fieldkey:"ws_code"},
//     {Label:"Product Name", fieldkey:"product_name"},
//     {Label:"Manufacturer", fieldkey:"manufacturer"},
//     {Label:"Combination", fieldkey:"combination"},
//     {Label:"Publish Status", fieldkey:"publish_status"},
//     ]

//     const actions = [
//       {use:"edit", icon:"	https://stage.mkwms.dev/assets/table/Edit-button.svg" , event:""},
//       {use:"copy", icon:"		https://stage.mkwms.dev/assets/table/copy-button.svg", event:""},
//     ]

//   return (
//     <div className="py-3">
//       <Breadcrumbs paths={[{ name: "Home", link: "/" }, { name: "Product Master" }]} />

//       <div className="bg-white mt-3">
//         <h1>Unpublished Products</h1>

               
 
//         <Search headers={headers.slice(0, 4)} onSearch={handleSearch} /> 

//         <Table headers={headers} data={products} actions={actions} variant="products" />

//         <div className="pagination">
//           <button onClick={prevPage} disabled={current_page === 1}>
//             Previous
//           </button>
//           <span>Page {current_page} of {last_page}</span>
//           <button onClick={nextPage} disabled={current_page >= last_page}>
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductMaster;








