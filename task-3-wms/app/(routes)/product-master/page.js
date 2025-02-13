"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "@/store/slices/productsSlice";
import Table from "@/app/components/Table";
import Filter from "@/app/components/Filters";
import Pagination from "@/app/components/Pagination";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import productData from "@/data/productData";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";

const ProductMaster = () => {
  const dispatch = useDispatch();
  const { products, loading, error, current_page, last_page, filters } = useSelector(
    (state) => state.products
  );

  const router = useRouter();

  useEffect(() => {
    dispatch(fetchProductsStart({ page: current_page, filters }));
  }, [dispatch, current_page, filters]);

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
          { name: "Product Master", link: "/product-master" }
        ]}
      />
        <Button onClick={() => router.push("/product-master/add-product")}>+ Add</Button>
      </div>
      <Filter onFilterChange={handleFilterChange} />
      <Table headers={productData.headers} data={products} variant="products" />
      <Pagination currentPage={current_page} lastPage={last_page} onPageChange={handlePageChange} />
    </>
  );
};

export default ProductMaster;
