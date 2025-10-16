import React  from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const isAuthenticated = localStorage.getItem("user");
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;