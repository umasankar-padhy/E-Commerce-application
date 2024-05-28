import React, { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import ProductForm from "./ProductForm";
import axios from "axios";
import { Link } from "react-router-dom";
import { url } from "../../default";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [auth, setAuth] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const retrieveAuth = () => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (storedAuth) {
      setAuth(storedAuth);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const response = await axios.get(`${url}api/v1/product`, config);
      if (response.data && response.data.success) {
        setProducts(response.data.data);
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    retrieveAuth();
  }, []);

  useEffect(() => {
    if (auth.token) {
      fetchProducts();
    }
  }, [auth]);

  const addProduct = async (product) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const response = await axios.post(
        `${url}api/v1/product/create`,
        product,
        config
      );
      if (response.data && response.data.success) {
        setProducts([...products, response.data.data]);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      } else {
        throw new Error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <Container>
      <Link to="/merchant/dashboard">Go to Merchant Dashboard</Link>

      <h1>Product Management</h1>

      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          Product added successfully!
        </Alert>
      )}

      <ProductForm addProduct={addProduct} />

      <h2>Product List</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>

      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <h3>{item.title}</h3>
            <p>Price: ${item.price}</p>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default ProductManagement;
