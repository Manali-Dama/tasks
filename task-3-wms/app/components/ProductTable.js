"use client";

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "@/store/slices/productsSlice";
import Table from "@/app/components/Table";
import productData from "@/data/productData.json";
import api from "@/utils/axiosInstance";

const ProductTable = ({ onFilterChange }) => {
  const dispatch = useDispatch();
  const { loading, error, current_page, last_page } = useSelector(
    (state) => state.products
  );

  const [filters, setFilters] = useState({
    isAssured: "",
    isRefrigerated: "",
    status: "",
    combinations: "",
    manufacturer: "",
  });

  const [apiData, setApiData] = useState([]); // Store fetched data
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
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const generateApiUrl = () => {
    let query = Object.entries(filters)
      .filter(([_, value]) => value) // Remove empty filters
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    return `/master/products/unpublished?${query}`;
  };

  const fetchApiData = async () => {
    const url = generateApiUrl();
    try {
      const response = await api.get(url);
      setApiData(response.data.products); // Store fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data. Check console.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <button className="bg-blue-800">Add </button>
      {/* Button to fetch data */}
      {/* <button onClick={fetchApiData} className="btn btn-primary mb-3">
        Fetch Data
      </button>
      

      Render table with API data */}
      <Table headers={productData.headers} data={apiData.length ? apiData : []} variant="products" />

      <div className="pagination">
        <button onClick={prevPage} disabled={current_page === 1}>
          Previous
        </button>
        <span>
          Page {current_page} of {last_page}
        </span>
        <button onClick={nextPage} disabled={current_page >= last_page}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
