import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../Storee/hooks";

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;