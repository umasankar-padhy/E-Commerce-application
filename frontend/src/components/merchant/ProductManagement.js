import React, { useState, useEffect } from "react";
import { Container, Alert, Button, Card, Carousel } from "react-bootstrap";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

import { Link, Routes, Route } from "react-router-dom"; // Import Routes and Route
import axios from "axios";
import { url } from "../../default";
import ProductEdit from "./ProductEdit";
import ProductView from "./ProductView";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
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
      const response = await axios.get(
        `${url}api/v1/product/getProduct`,
        config
      );
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

  const deleteProduct = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const response = await axios.delete(
        `${url}api/v1/product/delete/${id}`,
        config
      );
      if (response.data && response.data.success) {
        setProducts(products.filter((product) => product._id !== id));
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
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
          Product deleted successfully!
        </Alert>
      )}

      <h2>Product List</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <Card>
                {/* <Card.Img variant="top" src={product.imageUrl[0]} /> */}
                <Carousel
                  prevIcon={
                    <FaArrowAltCircleLeft
                      style={{ fontSize: "2rem", color: "#000" }}
                    />
                  }
                  nextIcon={
                    <FaArrowAltCircleRight
                      style={{ fontSize: "2rem", color: "#000" }}
                    />
                  }
                >
                  {product.imageUrl.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100 product-image"
                        src={image}
                        alt={product.title}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>Description: {product.description}</Card.Text>
                  <Card.Text>Price: ${product.price}</Card.Text>
                  <Link to={`/merchant/dashboard/products/view/${product._id}`}>
                    View
                  </Link>{" "}
                  |{" "}
                  <Link to={`/merchant/dashboard/products/edit/${product._id}`}>
                    Edit
                  </Link>{" "}
                  |{" "}
                  <Button variant="danger" onClick={() => deleteProduct(product._id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* Add Route for ProductEdit and ProductView components */}
      <Routes>
        <Route
          path="products/edit/:id"
          element={<ProductEdit />}
        />
        <Route
          path="products/view/:id"
          element={<ProductView />}
        />
      </Routes>
    </Container>
  );
};

export default ProductManagement;
