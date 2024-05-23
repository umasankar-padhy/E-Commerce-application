import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateCartItem } from '../redux/card/cartActions';

export default function Card({item}) {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const [qty, setQty] = useState(1);


    // const handleAddToCart = () => {
    //     if (newItem.id && newItem.title) {
    //         dispatch(addToCart(newItem));
    //         setNewItem({ id: '', name: '', quantity: 1 });
    //     }
    // };

    // const handleRemoveFromCart = (itemId) => {
    //     dispatch(removeFromCart(itemId));
    // };

    // const handleUpdateCartItem = (itemId, quantity) => {
    //     dispatch(updateCartItem(itemId, quantity));
    // };
  return (
    <div>
          <div className="card m-2" style={{ width: "16rem" }} key={item._id}>
              <img
                  src={item.imageUrl}
                  className="card-img-top"
                  alt={item.title}
                  style={{ height: "12rem" }}></img>

              {/* <h5 className="card-title">{props.post.title.length > 14 ? `${props.post.title.substring(0, 14)}...` : props.post.title}</h5> */}


              <div className="card-body" style={{ height: "11.5rem" }}>
                  <h6 className="card-title">{item.title.length > 64 ? `${item.title.substring(0, 64)}...` : item.title}</h6>
                 
                  <h5 className="card-title">&#8377;{item.price}/-</h5>
                  <h6 className="card-title">set Quantity :
                      <select className='ms-2 h-100 bg-light rounded' onChange={(e) => setQty(e.target.value)}>
                          {Array.from(Array(10), (e, i) => {
                              return (
                                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                              )
                          })}
                      </select>
                  </h6>
                 
                  <p className="card-text  " style={{ fontSize: ".76rem" }}>{item.description.length > 61 ? `${item.description.substring(0, 61)}...` : item.description}</p>
              </div>
              <div  >
                  <button
                      className="btn btn-primary ms-1 mb-1"
                      style={{ fontSize: ".8rem" }}
                      onClick={() => navigate(`/product/${item._id}`)}
                  >
                      More Details
                  </button>
                  <button
                      className="btn btn-warning ms-1 mb-1"
                      style={{ fontSize: ".8rem" }}
                    //   onClick={handleAddToCart}
                  >
                      ADD TO CART
                  </button>
              </div>
          </div>
    </div>
  )
}
