import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbarr from "./Navbar";
import Spinner from "./Spinner";
import { url } from "../default";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/cart/cartActions";
import { toast } from "react-toastify";
import StarRating from "./StartRating";
import CommentSection from "./CommentsPage";

export default function ProductDetails() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${url}api/v1/product/get/${params?.id}`);
        setProduct(data?.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Error fetching product details");
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) getProduct();
  }, [params?.id]);

  async function handleAddToCart(e) {
    e.preventDefault();
    if (Object.keys(auth).length === 0) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    try {
      setLoading(true);
      const formData = { product_id: params?.id, quantity: qty };
      const res = await axios.post(`${url}api/v1/cart/add-to-cart`, formData, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setCart(res?.data?.data));
        navigate("/cart");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add item to cart");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Navbarr />
      {loading ? (
        <Spinner />
      ) : (
        <div className="d-flex flex-wrap justify-content-center">
          <div className="row container mt-2">
            <div className="col-md-6">
              <img
                src={
                  Array.isArray(product.imageUrl)
                    ? product.imageUrl[0]
                    : product.imageUrl
                }
                className="card-img-top"
                alt={product.title}
                style={{
                  height: "400px",
                  width: "300px",
                }}
              />
            </div>
            <div className="col-md-6">
              <h2 className="text-center">Product Details</h2>
              <h5>{product.title}</h5>
              <p>{product.description}</p>
              <h4>&#8377; {product.price}/-</h4>
              <StarRating rating={product.rating} />
              <h6 className="card-title">
                Set Quantity :
                <select
                  className="ms-2 h-100 bg-light rounded"
                  onChange={(e) => setQty(e.target.value)}
                >
                  {Array.from(Array(10), (e, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </h6>
              <button
                className="btn btn-warning ms-1 mb-1"
                style={{ fontSize: ".8rem" }}
                onClick={handleAddToCart}
              >
                {loading ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>
          <div className="row container mt-4">
            <CommentSection productId={params.id} />
          </div>
        </div>
      )}
    </div>
  );
}
