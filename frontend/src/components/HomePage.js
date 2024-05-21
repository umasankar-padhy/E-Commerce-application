import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbarr from './Navbar';
import Spinner from './Spinner';


export default function HomePage() {
    // const [cart, setCart] = useCart();

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    //get products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/products`);
            setProducts(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };
    useEffect(() => {
        getAllProducts()
    }, []);
  return (
    <div>
          <Navbarr />
              <h2 className="text-center">All Products</h2>
        {loading?<Spinner />:
              <div className="d-flex flex-wrap justify-content-center">

                  {products?.map((p) => (
                      <div className="card m-2" style={{ width: "16rem" }} key={p._id}>
                          <img
                              src={p.imageUrl}
                              className="card-img-top"
                              alt={p.name}
                              style={{ height: "12rem" }}></img>

                          {/* <h5 className="card-title">{props.post.title.length > 14 ? `${props.post.title.substring(0, 14)}...` : props.post.title}</h5> */}


                          <div className="card-body" style={{ height: "9.5rem" }}>
                              <h6 className="card-title">{p.name.length > 64 ? `${p.name.substring(0, 64)}...` : p.name}</h6>
                              <h5 className="card-title">&#8377;{p.price}/-</h5>
                              <p className="card-text  " style={{ fontSize: ".76rem" }}>{p.description.length > 61 ? `${p.description.substring(0, 61)}...` : p.description}</p>
                          </div>
                          <div  >
                              <button
                                  className="btn btn-primary ms-1 mb-1"
                                  style={{ fontSize: ".8rem" }}
                                  onClick={() => navigate(`/product/${p._id}`)}
                              >
                                  More Details
                              </button>
                              <button
                                  className="btn btn-warning ms-1 mb-1"
                                  style={{ fontSize: ".8rem" }}
                                  onClick={() => {
                                      //       setCart([...cart, p]);
                                      //       localStorage.setItem(
                                      //           "cart",
                                      //           JSON.stringify([...cart, p])
                                      //       );
                                      alert("Item Added to cart");
                                  }}
                              >
                                  ADD TO CART
                              </button>
                          </div>
                      </div>
                  ))}
              </div>
        }
              {/* <div className="m-2 p-3">
                  {products && products.length < total && (
                      <button

                      className="btn btn-warning"

                          onClick={(e) => {
                              e.preventDefault();
                              setPage(page + 1);
                          }}
                      >
                          {loading ? "Loading ..." : "Load more"}
                      </button>
                  )}
              </div> */}
          
    </div>
  )
}
