import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "../../default";

const MerchantSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    alternatePhoneNo: "",
    email: "",
    password: "",
  });

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

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "30rem" }} className="p-4">
        <h2 className="text-center">Become a Seller</h2>
        <Form onSubmit={handleSubmit}>
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
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
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
