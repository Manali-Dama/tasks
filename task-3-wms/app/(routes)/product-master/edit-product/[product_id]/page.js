"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductRequest, updateProductRequest } from "@/store/slices/editSlice";
import { useParams } from "next/navigation";
import { form_fields } from "@/data/AddProductFormJson";
import CommonForm from "@/app/components/CommonForm";
import { fetchDropdownsRequest } from "@/store/slices/dropdownSlice";

const EditProductPage = () => {
    const dispatch = useDispatch();
    const { product_id } = useParams();
    const product = useSelector((state) => state.editProduct?.product);
    const dropdowns = useSelector((state) => state.dropdowns.dropdowns);
    const loading = useSelector((state) => state.editProduct?.loading);
    const error = useSelector((state) => state.editProduct?.error);

    useEffect(() => {
        dispatch(fetchProductRequest(product_id));
        dispatch(fetchDropdownsRequest());
    }, [dispatch, product_id]);

    const getInitialData = () => {
        if (!product) return {};

        return {
            product_name: product.product_name || "",
            product_type: dropdowns.product_type || "",
            ws_code: product.ws_code || "",
            product_code: product.product_code || "",
            manufacturers: product.manufacturer?.name || "",
            mrp: product.mrp || "",
            dosage_form: product.packaging_units?.dosage_form || "",
            package_type: product.packaging_units?.package_type || "",
            uom: product.packaging_units?.uom || "",
            package_size: product.packaging_units?.package_size || "",
            molecules: product.combination?.molecules?.map((m) => m.molecule_name) || [],
            is_assured: product.is_assured ? "yes" : "no",
            is_discontinued: product.is_discontinued ? "yes" : "no",
            banned: product.is_banned ? "yes" : "no",
            is_active: product.is_active ? "yes" : "no",
            is_rx_required: product.is_rx_required ? "yes" : "no",
            can_sell_online: product.can_sell_online ? "yes" : "no",
            is_chronic: product.is_chronic ? "yes" : "no",
            is_refrigerated: product.is_refrigerated ? "yes" : "no",
            scheduled_type_code: product.scheduled_type_code || "",
            purchase_unit: product.transaction_units?.purchase_unit || "",
            transfer_unit: product.transaction_units?.transfer_unit || "",
            sales_unit: product.transaction_units?.sales_unit || "",
            gst_type: product.taxes?.gst_type || "",
            hsn_code: product.taxes?.hsn_code || "",
            b2b_category: product.sales_category?.b2b_category || "",
            b2c_category: product.sales_category?.b2c_category?.category_name || "",
            sales_trend_category: product.sales_category?.sales_trend_category || "",
            product_return_type: product.sales_category?.return_type || "",
            mis_reporting_category: product.mis_reporting_category || "",
            mis_warehouse_category: product.mis_warehouse_category || "",
        };
    };

    const handleSubmit = (updatedData) => {
        dispatch(updateProductRequest({ product_id, formData: updatedData }));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!product) return <p>No product found</p>;

    return (
        <CommonForm 
            title="Edit Product"
            formFields={form_fields}
            initialData={getInitialData()}
            onSubmit={handleSubmit}
        />
    );
};

export default EditProductPage;





// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import api from "@/utils/axiosInstance";
// import CommonForm from "@/app/components/CommonForm";
// import { form_fields, ProductDropdowns } from "@/data/AddProductFormJson";

// const EditProductPage = () => {
//     const { product_id } = useParams();
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (!product_id) return;

//         const fetchProduct = async () => {
//             try {
//                 const response = await api.get(`/master/products/unpublished/${product_id}`, {
//                     headers: { "Location": "1" },
//                 });

//                 if (response.data.code === 200) {
//                     setProduct(response.data.product);
//                 } else {
//                     throw new Error(response.data.message);
//                 }
//             } catch (err) {
//                 setError(err.message || "Failed to fetch product.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProduct();
//     }, [product_id]);

//     const handleSubmit = async (formData) => {
//         try {
//             const response = await api.put(`/master/products/update/${product_id}`, formData, {
//                 headers: { "Location": "1" },
//             });

//             if (response.data.code === 200) {
//                 alert("Product updated successfully!");
//             } else {
//                 throw new Error(response.data.message);
//             }
//         } catch (err) {
//             alert(`Error updating product: ${err.message}`);
//         }
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error}</p>;

//     return (
//         <div>
//             <h1>Edit Product: {product?.product_name}</h1>
//             <CommonForm
//                 title="Edit Product"
//                 formFields={form_fields}
//                 dropdownOptions={ProductDropdowns}
//                 initialData={product}
//                 onSubmit={handleSubmit}
//             />
//         </div>
//     );
// };

// export default EditProductPage;




// "use client";
// import { useEffect, useMemo, useState, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProductRequest, updateProductRequest } from "@/store/slices/editSlice";
// import { fetchDropdownsRequest } from "@/store/slices/dropdownSlice";
// import { useParams } from "next/navigation";
// import { form_fields as baseFormFields } from "@/data/AddProductFormJson";
// import CommonForm from "@/app/components/CommonForm";

// const EditProductPage = () => {
//     const dispatch = useDispatch();
//     const { product_id } = useParams();

//     const product = useSelector((state) => state.editProduct?.product);
//     const dropdowns = useSelector((state) => state.dropdowns?.dropdowns);
//     const loading = useSelector((state) => state.editProduct?.loading);
//     const error = useSelector((state) => state.editProduct?.error);

//     const [formData, setFormData] = useState({});

//     useEffect(() => {
//         if (product_id) dispatch(fetchProductRequest(product_id));
//         dispatch(fetchDropdownsRequest());
//     }, [dispatch, product_id]);

//     useEffect(() => {
//         if (product) {
//             setFormData({
//                 product_name: product.product_name || "",
//                 product_type: product.product_type || "",
//                 ws_code: product.ws_code || "",
//                 product_code: product.product_code || "",
//                 manufacturer: product.manufacturer?.name || "",
//                 mrp: product.mrp || "",
//                 dosage_form: product.packaging_units?.dosage_form || "",
//                 package_type: product.packaging_units?.package_type || "",
//                 uom: product.packaging_units?.uom || "",
//                 package_size: product.packaging_units?.package_size || "",
//                 molecules: product.combination?.molecules?.map((m) => m.molecule_name) || [],
//                 is_assured: product.is_assured ? "yes" : "no",
//                 is_active: product.is_active ? "yes" : "no",
//                 is_rx_required: product.is_rx_required ? "yes" : "no",
//                 can_sell_online: product.can_sell_online ? "yes" : "no",
//                 is_chronic: product.is_chronic ? "yes" : "no",
//                 is_refrigerated: product.is_refrigerated ? "yes" : "no",
//                 scheduled_type_code: product.scheduled_type_code || "",
//                 purchase_unit: product.transaction_units?.purchase_unit || "",
//                 transfer_unit: product.transaction_units?.transfer_unit || "",
//                 sales_unit: product.transaction_units?.sales_unit || "",
//                 gst_type: product.taxes?.gst_type || "",
//                 hsn_code: product.taxes?.hsn_code || "",
//             });
//             console.log(formData)
//         }
//     }, [product]);

//     useEffect(() => {
//         console.log("FormData Changed:", formData);
//     }, [formData]);



//     const handleChange = (field, value) => {
//         setFormData((prev) => ({
//             ...prev,
//             [field]: value,
//         }));
//     };

//     const handleSubmit = useCallback(
//         (e) => {
//             // e.preventDefault();
//             if (!product_id) {
//                 console.error("Error: Product ID is missing");
//                 return;
//             }

//             const parseNumber = (value) => (isNaN(value) ? null : Number(value));
//             const parseBoolean = (value) => value === true || value === "true";

//             const finalData = {
//                 product_id: product_id,
//                 product_name: formData.product_name || "",
//                 product_code: formData.product_code || null,
//                 ws_code: formData.ws_code || "",
//                 product_type: formData.product_type || "",
            
//                 is_assured: parseBoolean(formData.is_assured),
//                 is_chronic: parseBoolean(formData.is_chronic),
//                 is_refrigerated: parseBoolean(formData.is_refrigerated),
//                 is_rx_required: parseBoolean(formData.is_rx_required),
//                 is_banned: parseBoolean(formData.is_banned),
//                 is_discontinued: parseBoolean(formData.is_discontinued),
//                 is_active: parseBoolean(formData.is_active),
//                 can_sell_online: parseBoolean(formData.can_sell_online),
//                 scheduled_type_code: formData.scheduled_type_code || "",
            
//                 manufacturer: {
//                     id: formData.manufacturer?.id || null, // Ensure it's not missing
//                     name: formData.manufacturer?.name || "",
//                 },
            
//                 combination: {
//                     molecules: Array.isArray(formData.combination.molecule) && formData.combination.molecules.length > 0
//                         ? formData.combination.molecules
//                         : [15566], 
//                 },
            
//                 packaging_units: {
//                     dosage_form: formData.packaging_units?.dosage_form || null,
//                     package_type: formData.packaging_units?.package_type || null,
//                     uom: formData.packaging_units?.uom || null,
//                     package_size: parseNumber(formData.packaging_units?.package_size) || null,
//                     volume_metric: parseNumber(formData.packaging_units?.volume_metric) || 0,
//                 },
            
//                 transaction_units: {
//                     sales_unit: parseNumber(formData.transaction_units?.sales_unit) || null,
//                     purchase_unit: parseNumber(formData.transaction_units?.purchase_unit) || null,
//                     transfer_unit: parseNumber(formData.transaction_units?.transfer_unit) || null,
//                 },
            
//                 taxes: {
//                     hsn_code: formData.taxes?.hsn_code || "",
//                     gst_type: formData.taxes?.gst_type || "",
//                 },
            
//                 sales_category: {
//                     b2b_category: formData.sales_category?.b2b_category || null,
//                     b2c_category: formData.sales_category?.b2c_category ? Number(formData.sales_category.b2c_category) : null, // Ensure integer
//                     sales_trend_category: formData.sales_category?.sales_trend_category || null,
//                     return_type: formData.sales_category?.return_type || null,
//                 },
            
//                 mrp: formData.mrp || "0",
//                 publish_status: formData.publish_status || "Draft",
//             };
            
//             console.log("Submitting update with data:", finalData);
//             dispatch(updateProductRequest({ product_id, finalData }));
//         },
//         [dispatch, product_id, formData]
//     );

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error}</p>;
//     if (!product) return <p>No product found</p>;

//     return (
//         <CommonForm
//             title="Edit Product"
//             formFields={baseFormFields}
//             initialData={formData}
//             onChange={handleChange}
//         />
//     );
// };

// export default EditProductPage;



// useEffect(() => {
//     if (product) {
//         setFormData((prev) => ({
//             ...prev,
//             product_name: product.product_name || "",
//             product_type: product.product_type || "",
//             ws_code: product.ws_code || "",
//             product_code: product.product_code || "",
//             manufacturers: product.manufacturer?.name || "",
//             mrp: product.mrp || "",

//             dosage_form: product.packaging_units?.dosage_form || "",
//             package_type: product.packaging_units?.package_type || "",
//             uom: product.packaging_units?.uom || "",
//             package_size: product.packaging_units?.package_size || "",

//             molecules: product.combination?.molecules?.map((m) => m.molecule_name) || [],

//             is_assured: product.is_assured ? "yes" : "no",
//             is_discontinued: product.is_discontinued ? "yes" : "no",
//             banned: product.is_banned ? "yes" : "no",
//             is_active: product.is_active ? "yes" : "no",
//             is_hidden_from_alternate_products: product.alternate_product_details?.id !== null ? "yes" : "no",
//             is_rx_required: product.is_rx_required ? "yes" : "no",
//             can_sell_online: product.can_sell_online ? "yes" : "no",
//             is_chronic: product.is_chronic ? "yes" : "no",
//             is_refrigerated: product.is_refrigerated ? "yes" : "no",
//             scheduled_type_code: product.scheduled_type_code || "",

//             purchase_unit: product.transaction_units?.purchase_unit || "",
//             transfer_unit: product.transaction_units?.transfer_unit || "",
//             sales_unit: product.transaction_units?.sales_unit || "",

//             gst_type: product.taxes?.gst_type || "",
//             hsn_code: product.taxes?.hsn_code || "",

//             b2b_category: product.sales_category?.b2b_category || "",
//             b2c_category: product.sales_category?.b2c_category?.category_name || "",
//             sales_trend_category: product.sales_category?.sales_trend_category || "",
//             product_return_type: product.sales_category?.return_type || "",

//             mis_reporting_category: product.mis_reporting_category || "",
//             mis_warehouse_category: product.mis_warehouse_category || "",
//         }));
//     }
// }, [product]);



// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import api from "@/utils/axiosInstance";
// import CommonForm from "@/app/components/CommonForm";
// import { form_fields, ProductDropdowns } from "@/data/AddProductFormJson";

// const EditProductPage = () => {
//     const { product_id } = useParams();
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (!product_id) return;

//         const fetchProduct = async () => {
//             try {
//                 const response = await api.get(`/master/products/unpublished/${product_id}`, {
//                     headers: { "Location": "1" },
//                 });

//                 if (response.data.code === 200) {
//                     setProduct(response.data.product);
//                 } else {
//                     throw new Error(response.data.message);
//                 }
//             } catch (err) {
//                 setError(err.message || "Failed to fetch product.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProduct();
//     }, [product_id]);

//     const handleSubmit = async (formData) => {
//         try {
//             const response = await api.put(`/master/products/${product_id}`, formData, {
//                 headers: { "Location": "1" },
//             });

//             if (response.data.code === 200) {
//                 alert("Product updated successfully!");
//             } else {
//                 throw new Error(response.data.message);
//             }
//         } catch (err) {
//             alert(`Error updating product: ${err.message}`);
//         }
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error}</p>;

//     return (
//         <div>
//             <h1>Edit Product: {product?.product_name}</h1>
//             <CommonForm
//                 title="Edit Product"
//                 formFields={form_fields}
//                 dropdownOptions={ProductDropdowns}
//                 initialData={product}
//                 onSubmit={handleSubmit}
//             />
//         </div>
//     );
// };

// export default EditProductPage;
