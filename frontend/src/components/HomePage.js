import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Container, Row, Col, Spinner, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbarr from "./Navbar";
import Card from "./Card"; // Import the Card component
import { url } from "../default";
import "./HomePage.css"; // Import custom CSS for additional styling

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Fetch products from the API
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}api/v1/product/get`);
      setProducts(data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Memoize the products data to prevent unnecessary re-renders
  const memoizedProducts = useMemo(() => products, [products]);

  // Calculate the current products to be displayed
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = memoizedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(memoizedProducts.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <Navbarr />
      <Container className="mt-4">
        <h2 className="text-center mb-4">All Products</h2>
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <>
            <Row className="justify-content-center">
              {currentProducts?.map((item) => (
                <Col key={item._id} md={4} lg={3} className="mb-4">
                  <Card item={item} auth={auth} navigate={navigate} />
                </Col>
              ))}
            </Row>
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                {pageNumbers.map((number) => (
                  <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
