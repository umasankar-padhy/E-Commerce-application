import React, { useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "../../default";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./MerchantSignup.css"; // Import custom styles

const MerchantSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    alternatePhoneNo: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${url}api/v1/merchant/signup`,
        formData
      );
      if (response.data.success) {
        alert("Merchant registered successfully!");
        window.location.href = "/merchant/login";
      } else {
        alert("Error registering merchant: " + response.data.message);
      }
    } catch (error) {
      console.error("Error registering merchant:", error);
      alert("Error registering merchant.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "30rem" }} className="p-4 shadow-lg">
        <h2 className="text-center mb-4">Become a Seller</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs={12} className="mb-3">
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Group controlId="formBasicPhoneNo">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Group controlId="formBasicAlternatePhoneNo">
                <Form.Label>Alternate Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your alternate phone number"
                  name="alternatePhoneNo"
                  value={formData.alternatePhoneNo}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Group controlId="formBasicPassword" className="position-relative">
                <Form.Label>Password</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} toggle-password`}
                    onClick={togglePasswordVisibility}
                  ></span>
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit" className="w-100 mt-3">
            Sign Up
          </Button>
        </Form>
        <div className="mt-3 text-center">
          <p>
            Already have an account? <Link to="/merchant/login">Sign in</Link>
          </p>
        </div>
      </Card>
    </Container>
  );
};

export default MerchantSignup;
