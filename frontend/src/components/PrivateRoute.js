import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';

const PrivateRoute = ({ element: Component }) => {
    const auth = useSelector((state) => state.auth);
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(false);
    }, [auth]);

    if (loading) {
        return <Spinner />;
    }

    if (!auth?.token) {
        navigate('/login', { state: { from: location.pathname } });
        return null; // Redirecting to login, so return nothing for now
    }
    return ( <Component />)
};

export default PrivateRoute;
