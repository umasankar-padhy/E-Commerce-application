import React, { useState } from "react";
import {
  Form,
  Card,
  Container,
  Row,
  Col,
  Button,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux"; // Import useSelector hook
import { url } from "../../default";
import "./ProductForm.css"; // Import the custom CSS file

const ProductForm = ({ addProduct }) => {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
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

  const [selectedImages, setSelectedImages] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const auth = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      selectedImages.forEach((image) => {
        formData.append("images", image);
      });
      Object.keys(productData).forEach((key) => {
        formData.append(key, productData[key]);
      });

      const response = await axios.post(
        `${url}api/v1/product/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data && response.data.success) {
        addProduct(response.data.data);
        setShowAlert(true); // Show success alert
        setProductData({
          title: "",
          description: "",
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
        setSelectedImages([]);
        setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
      } else {
        throw new Error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          {showAlert && (
            <Alert variant="success" className="custom-alert">
              Product added successfully!
            </Alert>
          )}
          <Card className="product-form-card">
            <Card.Header className="bg-primary text-white text-center">
              Add New Product
            </Card.Header>
            <Card.Body>
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
                    className="custom-input"
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
                    className="custom-input"
                  />
                </Form.Group>

                <Form.Group controlId="imageUrls" className="mb-3">
                  <Form.Label>Images</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    name="images"
                    onChange={handleImageChange}
                    className="custom-input"
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="price" className="mb-3">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter price"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        required
                        className="custom-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="quantity" className="mb-3">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter quantity"
                        name="quantity"
                        value={productData.quantity}
                        onChange={handleChange}
                        required
                        className="custom-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="size" className="mb-3">
                      <Form.Label>Size</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter size"
                        name="size"
                        value={productData.size}
                        onChange={handleChange}
                        className="custom-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="color" className="mb-3">
                      <Form.Label>Color</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter color"
                        name="color"
                        value={productData.color}
                        onChange={handleChange}
                        className="custom-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="MFG_Date" className="mb-3">
                      <Form.Label>Manufacturing Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="MFG_Date"
                        value={productData.MFG_Date}
                        onChange={handleChange}
                        required
                        className="custom-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="EXP_Date" className="mb-3">
                      <Form.Label>Expiry Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="EXP_Date"
                        value={productData.EXP_Date}
                        onChange={handleChange}
                        required
                        className="custom-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="brand" className="mb-3">
                      <Form.Label>Brand</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter brand"
                        name="brand"
                        value={productData.brand}
                        onChange={handleChange}
                        required
                        className="custom-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="category" className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter category"
                        name="category"
                        value={productData.category}
                        onChange={handleChange}
                        required
                        className="custom-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="rating" className="mb-3">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Rating will be generated"
                    name="rating"
                    value={productData.rating}
                    onChange={handleChange}
                    readOnly
                    className="custom-input"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Add Product
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductForm;
