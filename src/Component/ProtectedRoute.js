// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check if admin is authenticated from localStorage
  const isAdminAuthenticated = localStorage.getItem("isAdminAuthenticated") === "true";

  if (!isAdminAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;