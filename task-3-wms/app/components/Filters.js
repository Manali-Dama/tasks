import { useEffect, useState } from "react";
import api from "@/utils/axiosInstance"; // Import the custom axios instance

const Filter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    isAssured: "",
    isRefrigerated: "",
    status: "",
    manufacturer: "",
    combination: "",
  });

  const [molecules, setMolecules] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);

  // Fetch molecules and manufacturers on component mount
  useEffect(() => {
    const fetchMolecules = async () => {
      try {
        const response = await api.get('/master/molecules');
        if (response.data && Array.isArray(response.data.molecules)) {
          setMolecules(response.data.molecules);
        } else {
          console.error("Unexpected response format for molecules:", response);
        }
      } catch (error) {
        console.error("Error fetching molecules:", error);
      }
    };

    const fetchManufacturers = async () => {
      try {
        const response = await api.get('/master/manufacturers');
        if (response.data && Array.isArray(response.data.manufacturers)) {
          setManufacturers(response.data.manufacturers);
        } else {
          console.error("Unexpected response format for manufacturers:", response);
        }
      } catch (error) {
        console.error("Error fetching manufacturers:", error);
      }
    };

    fetchMolecules();
    fetchManufacturers();
  }, []);

  // Function to generate the API URL based on selected filters
  const fetchFilteredProducts = async (updatedFilters) => {
    let url = "/master/products/unpublished";
    const params = new URLSearchParams();

    if (updatedFilters.isAssured) params.append("is_assured", updatedFilters.isAssured);
    if (updatedFilters.isRefrigerated) params.append("is_refrigerated", updatedFilters.isRefrigerated);
    if (updatedFilters.status) params.append("publish_status", updatedFilters.status);
    if (updatedFilters.manufacturer) params.append("manufacturer", updatedFilters.manufacturer);
    if (updatedFilters.combination) params.append("combination", updatedFilters.combination);
    
    params.append("sort_by", "created,d");
    params.append("page", "1");

    try {
      const response = await api.get(`${url}?${params.toString()}`);
      console.log("Filtered Products Response:", response.data);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
    fetchFilteredProducts(newFilters); // Fetch products on filter change
  };

  return (
    <div className="filter-container">
      <select name="isAssured" onChange={handleFilterChange} value={filters.isAssured}>
        <option value="">Is Assured</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      <select name="isRefrigerated" onChange={handleFilterChange} value={filters.isRefrigerated}>
        <option value="">Is Refrigerated</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      <select name="status" onChange={handleFilterChange} value={filters.status}>
        <option value="">Status</option>
        <option value="unpublished">Unpublished</option>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>
      <select name="manufacturer" onChange={handleFilterChange} value={filters.manufacturer}>
        <option value="">Manufacturer</option>
        {manufacturers.map((manufacturer, idx) => (
          <option key={idx} value={manufacturer.id}>{manufacturer.name}</option>
        ))}
      </select>
      <select name="combination" onChange={handleFilterChange} value={filters.combination}>
        <option value="">Combination</option>
        {molecules.map((molecule, idx) => (
          <option key={idx} value={molecule.id}>{molecule.name}</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
