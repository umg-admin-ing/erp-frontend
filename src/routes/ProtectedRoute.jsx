import { Navigate, useLocation } from "react-router";
import { isAdmin, isLogged } from "../utils/auth";

export default function ProtectedRoute({ children, admin = false }) {
  const location = useLocation();

  if (!isLogged()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (admin && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return children;
}