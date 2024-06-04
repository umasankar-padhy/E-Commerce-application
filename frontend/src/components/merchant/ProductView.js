import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, Row, Col, Carousel } from "react-bootstrap";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { url } from "../../default";
import './ProductView.css'; // Import the CSS file

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${url}api/v1/product/get/${id}`);
        if (response.data && response.data.success) {
          setProduct(response.data.data);
        } else {
          throw new Error("Failed to fetch product");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;
  // console.log('Product:', product); // Log product to check image URLs

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h5">{product.title}</Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <Carousel
                prevIcon={
                  <FaArrowAltCircleLeft
                    style={{ fontSize: "2rem", color: "#000" }}
                  />
                }
                nextIcon={
                  <FaArrowAltCircleRight
                    style={{ fontSize: "2rem", color: "#000" }}
                  />
                }
              >
                {product.imageUrl.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100 product-image"
                      src={image}
                      alt={product.title}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
            <Col md={8}>
              <Card.Text>
                <strong>Price:</strong> ${product.price}
              </Card.Text>
              <Card.Text>
                <strong>Description:</strong> {product.description}
              </Card.Text>
              <Card.Text>
                <strong>Size:</strong> {product.size}
              </Card.Text>
              <Card.Text>
                <strong>Color:</strong> {product.color}
              </Card.Text>
              <Card.Text>
                <strong>Quantity:</strong> {product.quantity}
              </Card.Text>
              <Card.Text>
                <strong>Brand:</strong> {product.brand}
              </Card.Text>
              <Card.Text>
                <strong>Category:</strong> {product.category}
              </Card.Text>
              <Card.Text>
                <strong>Manufacturing Date:</strong> {new Date(product.MFG_Date).toLocaleDateString()}
              </Card.Text>
              <Card.Text>
                <strong>Expiry Date:</strong> {new Date(product.EXP_Date).toLocaleDateString()}
              </Card.Text>
              <Card.Text>
                <strong>Rating:</strong> {product.rating} / 5
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductView;
