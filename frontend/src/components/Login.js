


import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {  useState } from "react";
import Navbarr from "./Navbar";
import { useDispatch } from 'react-redux';
import { setAuth } from '../redux/auth/authActions';
import Spinner from "./Spinner";
import { url } from "../default";
import { toast } from "react-toastify";


export default function Login() {
    const navigate = useNavigate();
    const [view, setView] = useState(true)
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setView(true)
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await axios.post(`${url}api/v1/user/login`, formData);

            if (res.data.success) {
                toast(res.data.message);
                dispatch(setAuth(res.data));
                localStorage.setItem("auth", JSON.stringify(res.data));
                // navigate(location.state || "/home");
                navigate(location.state?.from || '/home');
            } else {
                toast(res.data.message);
            }
            setLoading(false);

        } catch (err) {
            setLoading(false);

            console.error("Error:", err);
        }
    }

    return (
        <div>
            <Navbarr />
            {/* <div style={{ backgroundColor: "#ffff00" }}> <h4 className="p-2 m-2">login Page</h4></div> */}

            {loading ? <Spinner /> :
                <div className="d-flex  justify-content-center align-items-center" style={{ minHeight: "90vh" }}>

                    <form className="col-3-lg col-6-md col-9-sm border border-5 border-light rounded rounded-3" onSubmit={handleSubmit}>
                        <div className="m-1 rounded rounded-2  " style={{ backgroundColor: "#e8e9eb" }}> <h4 className="p-2 m-2">login Page</h4></div>

                        <div className="p-1 m-2">
                            {/* <label htmlFor="email">Enter User Name:</label> */}
                            <input
                                type="text" className="form-control" id="email" name="email"
                                value={formData.email} placeholder="Enter Email" onChange={handleInputChange}
                                autoFocus required
                            />
                        </div>
                        <div className="p-1 m-2 " style={{ height: "3rem" }}>
                            {/* <label htmlFor="password">Enter password:</label> */}
                            {view ?
                                <div style={{ height: "3rem" }}>
                                    <input
                                        type="password" className="form-control" id="password" name="password"
                                        // autoComplete="off"
                                        value={formData.password} placeholder="Enter Password" onChange={handleInputChange}
                                        required
                                    /><span className="bi bi-eye-slash-fill  "
                                        onClick={() => setView(false)}
                                        style={{ position: 'relative', left: "181px", bottom: "30px" }}
                                    ></span>
                                </div> :
                                <div style={{ height: "3rem" }}>
                                    <input
                                        type="text" className="form-control" id="password" name="password"
                                        value={formData.password} placeholder="Enter Password" onChange={handleInputChange}
                                        required
                                    /><span className="bi bi-eye  "
                                        onClick={() => setView(true)}

                                        style={{ position: 'relative', left: "181px", bottom: "30px" }}
                                    ></span>
                                </div>
                            }

                        </div>
                        <div className="p-1 m-2">
                            <button className="btn btn-primary w-100" type="submit"> Login</button>
                        </div>
                        <div className="p-1 m-2">

                            <Link to="/register">Don't have an account ?</Link> sign-up
                            <br />
                            <Link to="/forgot_password">forgot password ?</Link>
                        </div>
                    </form>
                </div>
            }

            
        </div>
    );
}
