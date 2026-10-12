import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../Storee/hooks";

const ProtectedRoute = () => {
  const { isAuthenticated, user } = useAppSelector(
    (state) => state.auth
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Only users with 'seller' role can access the seller/admin portal
  if (user?.role !== "seller") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;