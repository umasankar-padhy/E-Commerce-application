import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { url } from "../default";
import { toast } from "react-toastify";
import Navbarr from "./Navbar";

const ResetPasswordUser = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${url}api/v1/user/reset-password`, {
        email,
        otp,
        password,
        confirmPassword,
      });
      setMessage(response.data.message);
      setError("");
      toast.success("Password changed successfully");
      navigate("/login");
    } catch (err) {
      setMessage("");
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbarr />
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <div className="col-3-lg col-6-md col-9-sm border border-5 border-light rounded rounded-3">
            <div className="m-1 rounded rounded-2" style={{ backgroundColor: "#e8e9eb" }}>
              <h4 className="p-2 m-2">Reset Password</h4>
            </div>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit} className="mx-2">
              <Form.Group controlId="formEmail" className=" ms-2">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formOtp" className=" ms-2">
                <Form.Label>Enter OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className=" ms-2">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formConfirmPassword" className=" ms-2">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3 w-100">
                Reset Password
              </Button>
              <div className=" ms-2">
                <Link to="/login">Back to Login</Link>
              </div>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordUser;
