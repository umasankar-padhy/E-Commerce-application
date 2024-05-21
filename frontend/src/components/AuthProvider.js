// src/components/AuthProvider.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../redux/auth/authActions';

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const data = localStorage.getItem("auth");
        if (data) {
            const parseData = JSON.parse(data);
            dispatch(setAuth(parseData));
        }
    }, [dispatch]);

    return <>{children}</>;
};

export default AuthProvider;
