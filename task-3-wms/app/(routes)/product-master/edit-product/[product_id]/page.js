"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/utils/axiosInstance";
import CommonForm from "@/app/components/CommonForm";
import { form_fields, ProductDropdowns } from "@/data/AddProductFormJson";

const EditProductPage = () => {
    const { product_id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!product_id) return;

        const fetchProduct = async () => {
            try {
                const response = await api.get(`/master/products/unpublished/${product_id}`, {
                    headers: { "Location": "1" },
                });

                if (response.data.code === 200) {
                    setProduct(response.data.product);
                } else {
                    throw new Error(response.data.message);
                }
            } catch (err) {
                setError(err.message || "Failed to fetch product.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [product_id]);

    const handleSubmit = async (formData) => {
        try {
            const response = await api.put(`/master/products/update/${product_id}`, formData, {
                headers: { "Location": "1" },
            });

            if (response.data.code === 200) {
                alert("Product updated successfully!");
            } else {
                throw new Error(response.data.message);
            }
        } catch (err) {
            alert(`Error updating product: ${err.message}`);
        }
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
