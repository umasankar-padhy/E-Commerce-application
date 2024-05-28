import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { url } from "../../default";
import { useSelector } from "react-redux";
import ProductForm from "./ProductForm";
import ReadMore from "./ReadMore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ReadMore.css"; 
import "./ProductManagement.css"; // Import custom CSS for card and image sizing

const ProductManagement = ({ auth }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        toast.success("Product deleted successfully!");
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product!");
    }
  };

  useEffect(() => {
    if (auth.token) {
      fetchProducts();
    }
  }, [auth]);

  return (
    <Container className="mt-4">
      <ToastContainer />
      <Link to="/merchant/dashboard">Go to Merchant Dashboard</Link>

      <h1>Product Management</h1>

      <ProductForm />

      <h2>Product List</h2>
      <Row>
        {products.map((product, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="product-card">
              <div className="image-container">
                <Card.Img variant="top" src={product.imageUrl} className="product-image"/>
              </div>
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>Price: ${product.price}</Card.Text>
                <Card.Text>
                  <ReadMore text={product.description} maxLength={100} />
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="info"
                    as={Link}
                    to={`/merchant/dashboard/products/view/${product._id}`}
                  >
                    <FaEye /> View
                  </Button>
                  <Button
                    variant="warning"
                    as={Link}
                    to={`/merchant/dashboard/products/edit/${product._id}`}
                  >
                    <FaEdit /> Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteProduct(product._id)}
                  >
                    <FaTrashAlt /> Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductManagement;
