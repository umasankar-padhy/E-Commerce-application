import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../../default";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MerchantLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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
        `${url}api/v1/merchant/login`,
        formData
      );

      if (response.data.success) {
        if (response.data.token) {
          localStorage.setItem(
            "auth",
            JSON.stringify({ token: response.data.token })
          );
          toast.success("Logged in successfully!");
          // Redirect the user to a specific page after successful login
          navigate("/merchant/dashboard");
        } else {
          toast.error("No token received!");
        }
      } else {
        toast.error("Login failed! " + response.data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Error logging in!");
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <ToastContainer />
      <Card style={{ width: "30rem" }} className="p-4">
        <h2 className="text-center">Merchant Login</h2>
        <Form onSubmit={handleSubmit}>
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
            Login
          </Button>
        </Form>
        <div className="mt-3 text-center">
          <p>
            Don't have an account? <Link to="/merchant/signup">Sign up</Link>
          </p>
        </div>
      </Card>
    </Container>
  );
};

export default MerchantLogin;
