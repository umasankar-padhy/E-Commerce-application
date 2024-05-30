import React, { useState } from "react";
import { Container, Form, Button, Alert, Toast } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../../default";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [showResetButton, setShowResetButton] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}api/v1/merchant/forgot-password`, { email });
      setShowToast(true);
      setShowOtpBox(true);
      setShowResetButton(true); // Show the reset password button
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleResetPassword = async () => {
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      const response = await axios.post(`${url}api/v1/merchant/reset-password`, { email, otp, password, confirmPassword });
      navigate("/merchant/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Forgot Password</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Send OTP
        </Button>
      </Form>
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autoHide
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          minWidth: "250px",
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>OTP sent to your email successfully</Toast.Body>
      </Toast>
      {showOtpBox && (
        <>
          <Form.Group controlId="formOtp" className="mt-3">
            <Form.Label>OTP</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </Form.Group>
        </>
      )}
      {showResetButton && (
        <>
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formConfirmPassword" className="mt-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" className="mt-3" onClick={handleResetPassword}>
            Reset Password
          </Button>
        </>
      )}
    </Container>
  );
};

export default ForgotPassword;
