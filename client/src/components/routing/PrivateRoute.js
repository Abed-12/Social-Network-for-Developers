import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';

const PrivateRoute = ({ element: Component }) => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);

    if (loading) {
        return <Spinner />; 
    }

    return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default PrivateRoute;