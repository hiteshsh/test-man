import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
  //const { auth } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));
  //user = JSON.stringify(user);
  const location = useLocation();
  //console.log("required auth", user);
  //console.log("emailid auth", user?.emailId);
  //console.log("token auth", user?.accesstoken);
  return user?.accesstoken ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
