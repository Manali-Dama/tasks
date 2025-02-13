"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductRequest, updateProductRequest } from "@/store/slices/editSlice";
import CommonForm from "@/app/components/CommonForm";
import { form_fields, ProductDropdowns } from "@/data/AddProductFormJson";

const EditProductPage = () => {
    const { product_id } = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.editProduct);

    useEffect(() => {
        if (product_id) {
            dispatch(fetchProductRequest(product_id));
        }
    }, [product_id, dispatch]);

    const handleSubmit = (formData) => {
        dispatch(updateProductRequest({ product_id, formData }));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Edit Product: {product?.product_name}</h1>
            <CommonForm
                title="Edit Product"
                formFields={form_fields}
                dropdownOptions={ProductDropdowns}
                initialData={product}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default EditProductPage;
