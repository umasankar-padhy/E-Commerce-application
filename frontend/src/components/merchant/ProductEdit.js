import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { url } from "../../default";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductEdit = () => {
    const { id } = useParams();
    const [productData, setProductData] = useState({
        title: "",
        description: "",
        imageUrl: "",
        price: "",
        quantity: "",
        size: "",
        color: "",
        MFG_Date: "",
        EXP_Date: "",
        brand: "",
        category: "",
        rating: 0,
    });
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `${url}api/v1/product/getProduct/${id}`
                );
                if (response.data && response.data.success) {
                    setProductData(response.data.data);
                } else {
                    throw new Error("Failed to fetch product");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            };
            const response = await axios.put(
                `${url}api/v1/product/update/${id}`,
                productData,
                config
            );
            if (response.data && response.data.success) {
                toast.success("Product updated successfully!");
                setTimeout(() => {
                    navigate("/merchant/dashboard/products");
                }, 2000); // Delay navigation to allow the toast to be seen
            } else {
                throw new Error("Failed to update product");
            }
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error("Error updating product!");
        }
    };

    return (
        <Container>
            <ToastContainer />
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title" className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        name="title"
                        value={productData.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="description" className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter description"
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="imageUrl" className="mb-3">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter image URL"
                        name="imageUrl"
                        value={productData.imageUrl}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="price" className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter price"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="quantity" className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter quantity"
                        name="quantity"
                        value={productData.quantity}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="size" className="mb-3">
                    <Form.Label>Size</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter size"
                        name="size"
                        value={productData.size}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="color" className="mb-3">
                    <Form.Label>Color</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter color"
                        name="color"
                        value={productData.color}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="MFG_Date" className="mb-3">
                    <Form.Label>Manufacturing Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="MFG_Date"
                        value={productData.MFG_Date}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="EXP_Date" className="mb-3">
                    <Form.Label>Expiry Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="EXP_Date"
                        value={productData.EXP_Date}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="brand" className="mb-3">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter brand"
                        name="brand"
                        value={productData.brand}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="category" className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter category"
                        name="category"
                        value={productData.category}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="rating" className="mb-3">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Rating will be generated"
                        name="rating"
                        value={productData.rating}
                        onChange={handleChange}
                        readOnly
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Update Product
                </Button>
            </Form>
        </Container>
    );
};

export default ProductEdit;