import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, Row, Col } from "react-bootstrap";
import { url } from "../../default";

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

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h5">{product.title}</Card.Header>
        <Card.Body>
          <Row>
            <Col md={4} className="d-flex align-items-center">
              <Card.Img
                variant="top"
                src={product.imageUrl}
                className="img-fluid rounded"
              />
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
