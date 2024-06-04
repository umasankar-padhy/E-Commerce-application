import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { url } from "../../default";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Profile.css"; // Import custom CSS for additional styling

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    phoneNo: "",
    alternatePhoneNo: "",
  });
  const auth = useSelector((state) => state.auth);
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch merchant profile data on component mount
    if (!(Object.keys(auth).length === 0)) {fetchProfile(); }
    
  }, [auth]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      // console.log(1)
      const response = await axios.get(`${url}api/v1/merchant/getProfile`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      // console.log(2)
      if (response.data && response.data.success) {
        const { name, phoneNo, alternatePhoneNo } = response.data.data;
        setProfileData({ name, phoneNo, alternatePhoneNo });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setShowAlert(true);
      setAlertVariant("danger");
      setAlertMessage("Failed to fetch profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        `${url}api/v1/merchant/updateProfile`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (response.data && response.data.success) {
        setShowAlert(true);
        setAlertVariant("success");
        setAlertMessage(response.data.message);
        // Re-fetch profile data to ensure the state is updated
        fetchProfile();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setShowAlert(true);
      setAlertVariant("danger");
      setAlertMessage("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const redirectToDashboard = () => {
    navigate("/merchant/dashboard");
  };

  return (
    <Container>
      <h1 className="my-4">Merchant Profile</h1>
      {loading && <Spinner animation="border" variant="primary" />}
      {showAlert && <Alert variant={alertVariant}>{alertMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="phoneNo">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              name="phoneNo"
              value={profileData.phoneNo}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="alternatePhoneNo">
            <Form.Label>Alternate Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter alternate phone number"
              name="alternatePhoneNo"
              value={profileData.alternatePhoneNo}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit" className="me-2" disabled={loading}>
          Update Profile
        </Button>
        <Button
          variant="secondary"
          onClick={redirectToDashboard}
          className="custom-dashboard-button"
          disabled={loading}
        >
          Go to Dashboard
        </Button>
      </Form>
    </Container>
  );
};

export default Profile;
