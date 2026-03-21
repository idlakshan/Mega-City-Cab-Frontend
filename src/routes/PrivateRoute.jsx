import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = ({ children, role }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    toast.error("You must be logged in!");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role) {
    const rolesArray = Array.isArray(role) ? role : [role];
    const isAuthorized = user.roles.some((r) => rolesArray.includes(r));
    if (!isAuthorized) {
      toast.error("You are not authorized to access this page!");
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  return children;
};


export default PrivateRoute;
