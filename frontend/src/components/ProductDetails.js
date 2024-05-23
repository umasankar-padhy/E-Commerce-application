import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
import Navbarr from './Navbar';
import Spinner from './Spinner';

export default function ProductDetails() {
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({});
  const getProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`api/v1/product/get/${params?.id}`);
      setProduct(data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.id) getProduct();
  }, [params?.id]);
  return (
    <div>
      <Navbarr />
      {/* <pre>{JSON.stringify(product, null, 4)}</pre>  */}

      {loading?<Spinner />:
        <div className="d-flex flex-wrap justify-content-center">

          <div className="row container mt-2">
            <div className="col-md-6">
              <img
                src={product.imageUrl}
                className="card-img-top"
                alt={product.title}
                style={{
                  height: "400px", width: "300px"
                }}

              />
            </div>
            <div className="col-md-6 ">
              <h2 className="text-center">Product Details</h2>
              <h5>{product.title}</h5>
              <p>{product.description}</p>
              <h4>Rs. {product.price}/-</h4>
              <button className="btn btn-warning " onClick={() => {
                // setCart([...cart, product]);
                // localStorage.setItem(
                //   "cart",
                //   JSON.stringify([...cart, product])
                // );
                alert("Item Added to cart");
              }}>
                ADD TO CART
              </button>
            </div>
          </div>
        </div>}
    </div>
  )
}
