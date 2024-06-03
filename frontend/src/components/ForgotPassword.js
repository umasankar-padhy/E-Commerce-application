import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Toast, Spinner } from "react-bootstrap";
import axios from "axios";
import { url } from "../default";
import Navbarr from "./Navbar";

const ForgotPasswordUser = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [showResetButton, setShowResetButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${url}api/v1/user/forgot-password`, { email });
      setShowToast(true);
      setShowOtpBox(true);
      setShowResetButton(true);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }
      const response = await axios.post(`${url}api/v1/user/reset-password`, { email, otp, password, confirmPassword });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbarr />
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
        <div className="col-4-lg col-6-md col-9-sm border border-5 border-light rounded rounded-3">
          <div className="m-1 rounded rounded-2" style={{ backgroundColor: "#e8e9eb" }}>
            <h4 className="p-2 m-2">Forgot Password</h4>
          </div>
          {loading ? (
            <Spinner animation="border" role="status" className="d-flex justify-content-center">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <>
              {error && <Alert variant="danger" className="m-2">{error}</Alert>}
              <Form onSubmit={handleSubmit} className="mx-2">
                <Form.Group controlId="formEmail" className=" m-2">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-2 w-100">
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
                <Form.Group controlId="formOtp" className=" m-2 mt-2">
                  <Form.Label>OTP</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </Form.Group>
              )}
              {showResetButton && (
                <>
                  <Form.Group controlId="formPassword" className=" m-2 mt-2">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formConfirmPassword" className=" m-2 mt-2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" className="mt-2 w-100" onClick={handleResetPassword}>
                    Reset Password
                  </Button>
                </>
              )}
              <div className=" m-2 mt-2">
                <Link to="/login">Back to Login</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordUser;
