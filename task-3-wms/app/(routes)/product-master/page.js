"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "@/store/slices/productsSlice";
import Table from "@/app/components/Table";
import Filter from "@/app/components/Filters";
import Pagination from "@/app/components/Pagination";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import { productData } from "@/data/productData";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import Search from "@/app/components/Search";

const ProductMaster = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { products, loading, error, current_page, last_page, filters, searchField, searchQuery } =
    useSelector((state) => state.products);

  // Store previous state to prevent unnecessary re-fetching
  const prevStateRef = useRef(null);

  useEffect(() => {
    // Check if there’s an actual change in state
    const hasStateChanged =
      !prevStateRef.current || 
      prevStateRef.current.current_page !== current_page ||
      JSON.stringify(prevStateRef.current.filters) !== JSON.stringify(filters) ||
      prevStateRef.current.searchField !== searchField ||
      prevStateRef.current.searchQuery !== searchQuery;

    if (hasStateChanged) {
      dispatch(fetchProductsStart({ page: current_page, filters }));
      prevStateRef.current = { current_page, filters, searchField, searchQuery }; // Update stored state
    }
  }, [dispatch, current_page, filters, searchField, searchQuery]);

  const handleSearch = (field, query) => {
    if (!field || !query) return;

    const searchParam = `${query},${field}`;
    dispatch(
      fetchProductsStart({
        page: 1,
        filters: { ...filters, search: searchParam, sort_by: "created,d" },
      })
    );
  };

  const handleFilterChange = (newFilters) => {
    dispatch(fetchProductsStart({ page: 1, filters: newFilters }));
  };

  const handlePageChange = (page) => {
    dispatch(fetchProductsStart({ page, filters }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="flex justify-between">
        <Breadcrumbs
          paths={[
            { name: "Home", link: "/" },
            { name: "Product Master", link: "/product-master" },
          ]}
        />
        <Button onClick={() => router.push("/product-master/add-product")}>+ Add</Button>
      </div>
      <div className="p-10">
        <div className="bg-[#fff] p-4">
          <p className="px-4">Unpublished products</p>
          <Search
            headers={productData.headers.slice(0,4)}
            onSearch={handleSearch}
            searchField={searchField}
            searchQuery={searchQuery}
          />
          <Filter onFilterChange={handleFilterChange} />
          <Table headers={productData.headers} data={products} variant="products" />
          <Pagination currentPage={current_page} lastPage={last_page} onPageChange={handlePageChange} />
        </div>
      </div>
    </>
  );
};

export default ProductMaster;




// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProductsStart } from "@/store/slices/productsSlice";
// import Table from "@/app/components/Table";
// import Filter from "@/app/components/Filters";
// import Pagination from "@/app/components/Pagination";
// import Button from "@/app/components/Button";
// import { useRouter } from "next/navigation";
// import { productData } from "@/data/productData";
// import { Breadcrumbs } from "@/app/components/Breadcrumbs";
// import Search from "@/app/components/Search";

// const ProductMaster = () => {
//   const dispatch = useDispatch();
//   const { products, loading, error, current_page, last_page, filters } = useSelector(
//     (state) => state.products
//   );
//   const router = useRouter();

//   // Fetch products initially and when filters/page change
//   useEffect(() => {
//     dispatch(fetchProductsStart({ page: current_page, filters }));
//   }, [dispatch, current_page, filters]);

//   // Debounced Search Handler (prevents excessive API calls)
//   const handleSearch = (field, query) => {
//     if (!field || !query) return;
  
//     const searchParam = `${query},${field}`;
//     dispatch(fetchProductsStart({ 
//       page: 1, 
//       filters: { ...filters, search: searchParam, sort_by: "created,d" } 
//     }));
//   };
  

//   const handleFilterChange = (newFilters) => {
//     dispatch(fetchProductsStart({ page: 1, filters: newFilters }));
//   };

//   const handlePageChange = (page) => {
//     dispatch(fetchProductsStart({ page, filters }));
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <>
//       <div className="flex justify-between">
//         <Breadcrumbs
//           paths={[
//             { name: "Home", link: "/" },
//             { name: "Product Master", link: "/product-master" }
//           ]}
//         />
//         <Button onClick={() => router.push("/product-master/add-product")}>+ Add</Button>
//       </div>
//       <div className="p-10">
//         <div className="bg-[#fff] p-4">
//           <p className="px-4">Unpublished products</p>
//           <Search headers={productData.headers} onSearch={handleSearch} />
//           <Filter onFilterChange={handleFilterChange} />
//           <Table headers={productData.headers} data={products} variant="products" />
//           <Pagination currentPage={current_page} lastPage={last_page} onPageChange={handlePageChange} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductMaster;




// "use client";

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProductsStart } from "@/store/slices/productsSlice";
// import Table from "@/app/components/Table";
// import Filter from "@/app/components/Filters";
// import Pagination from "@/app/components/Pagination";
// import Button from "@/app/components/Button";
// import { useRouter } from "next/navigation";
// import { productData } from "@/data/productData";
// import { Breadcrumbs } from "@/app/components/Breadcrumbs";
// import Search from "@/app/components/Search";

// const ProductMaster = () => {
//   const dispatch = useDispatch();
//   const { products, loading, error, current_page, last_page, filters } = useSelector(
//     (state) => state.products
//   );

//   const router = useRouter();

//   useEffect(() => {
//     dispatch(fetchProductsStart({ page: current_page, filters }));
//   }, [dispatch, current_page, filters]);

//   const handleFilterChange = (newFilters) => {
//     dispatch(fetchProductsStart({ page: 1, filters: newFilters }));
//   };

//   const handlePageChange = (page) => {
//     dispatch(fetchProductsStart({ page, filters }));
//   };

//   const handleSearch = (field, query) => {
//     dispatch(fetchProductsStart({ page: 1, filters: { ...filters, [field]: query } }));
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <>
//       <div className="flex justify-between">
//         <Breadcrumbs
//           paths={[
//             { name: "Home", link: "/" },
//             { name: "Product Master", link: "/product-master" }
//           ]}
//         />
//         <Button onClick={() => router.push("/product-master/add-product")}>+ Add</Button>
//       </div>
//       <div className="p-10">
//         <div className="bg-[#fff] p-4">
//           <p className="px-4">Unpublished products</p>
//           <Search headers={productData.headers} onSearch={handleSearch} />
//           <Filter onFilterChange={handleFilterChange} />
//           <Table headers={productData.headers} data={products} variant="products" />
//           <Pagination currentPage={current_page} lastPage={last_page} onPageChange={handlePageChange} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductMaster;



// "use client";

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProductsStart } from "@/store/slices/productsSlice";
// import Table from "@/app/components/Table";
// import Filter from "@/app/components/Filters";
// import Pagination from "@/app/components/Pagination";
// import Button from "@/app/components/Button";
// import { useRouter } from "next/navigation";
// import productData from "@/data/productData";
// import { Breadcrumbs } from "@/app/components/Breadcrumbs";
// import Search from "@/app/components/Search";

// const ProductMaster = () => {
//   const dispatch = useDispatch();
//   const { products, loading, error, current_page, last_page, filters } = useSelector(
//     (state) => state.products
//   );

//   const router = useRouter();

//   useEffect(() => {
//     dispatch(fetchProductsStart({ page: current_page, filters }));
//   }, [dispatch, current_page, filters]);

//   const handleFilterChange = (newFilters) => {
//     dispatch(fetchProductsStart({ page: 1, filters: newFilters }));
//   };

//   const handlePageChange = (page) => {

//     dispatch(fetchProductsStart({ page, filters }));
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <>
//       <div className="flex justify-between">
//       <Breadcrumbs
//         paths={[
//           { name: "Home", link: "/" },
//           { name: "Product Master", link: "/product-master" }
//         ]}
//       />
//         <Button onClick={() => router.push("/product-master/add-product")}>+ Add</Button>
//       </div>
//       <div className="p-10">
//       <div className="bg-[#fff]">
//         <p className="px-4">Unpublished products</p>
//         <Search />
//       <Filter onFilterChange={handleFilterChange} />
//       <Table headers={productData.headers} data={products} variant="products" />
//       <Pagination currentPage={current_page} lastPage={last_page} onPageChange={handlePageChange} />
//       </div>
//       </div>
//     </>
//   );
// };

// export default ProductMaster;
