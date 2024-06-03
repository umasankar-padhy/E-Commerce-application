import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { url } from '../default'; // Assuming you have a base URL in your project
import { useSelector } from 'react-redux';

const AddressForm = ({ setShowAddressForm , fetchAddresses }) => {
    const [addressData, setAddressData] = useState({
        houseNo: '',
        streetName: '',
        city: '',
        district: '',
        state: '',
        country: '',
        pin: '',
    });
    const auth = useSelector((state) => state.auth);

    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddressData({
            ...addressData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}api/v1/address/create`, addressData,
                {
                    headers: {
                        Authorization: `Bearer ${auth?.token}`
                    }
                }
            );
            if (response.data && response.data.success) {
                // addAddress(response.data.data);
                setShowAlert(true);
setShowAddressForm(false)
fetchAddresses()
                setAddressData({
                    houseNo: '',
                    streetName: '',
                    city: '',
                    district: '',
                    state: '',
                    country: '',
                    pin: '',
                });
                setTimeout(() => setShowAlert(false), 3000);
            } else {
                throw new Error('Failed to add address');
            }
        } catch (error) {
            console.error('Error adding address:', error);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={8}>
                    {showAlert && (
                        <Alert variant="success" className="custom-alert">
                            Address added successfully!
                        </Alert>
                    )}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="houseNo" className="mb-3">
                            <Form.Label>House Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter house number"
                                name="houseNo"
                                value={addressData.houseNo}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="streetName" className="mb-3">
                            <Form.Label>Street Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter street name"
                                name="streetName"
                                value={addressData.streetName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="city" className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter city"
                                name="city"
                                value={addressData.city}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="district" className="mb-3">
                            <Form.Label>District</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter district"
                                name="district"
                                value={addressData.district}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="state" className="mb-3">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter state"
                                name="state"
                                value={addressData.state}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="country" className="mb-3">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter country"
                                name="country"
                                value={addressData.country}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="pin" className="mb-3">
                            <Form.Label>PIN</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter pin"
                                name="pin"
                                value={addressData.pin}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Add Address
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddressForm;
