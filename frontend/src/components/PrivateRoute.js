import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element: Component }) => {
    const auth = useSelector((state) => state.auth);
    const location = useLocation();

    return auth?.token ? <Component /> : <Navigate to="/login" state={{ from: location.pathname }} />;
};

export default PrivateRoute;
