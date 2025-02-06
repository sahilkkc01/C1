import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const user = localStorage.getItem("user"); // Check for user authentication
  const user_permissions = localStorage.getItem("user_permissions");
  const location = useLocation();
  const pathname = location.pathname;

  // Check for user authentication
  if (user && user_permissions) {
    // console.log(JSON.parse(user));
    const permissions = JSON.parse(user_permissions);
    // console.log(permissions);
    const hasPermission = permissions.some((permission) => {
      if (permission.route.url) {
        const shortUrl = permission.route.url.replace(
          "https://ctas.live/",
          ""
        ); 
        return `/${shortUrl}` === pathname;
      }
    });

    if (hasPermission) {
      return children;
    } else {
      Swal.fire({
        icon: "error",
        text: "Denied Access",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/");
      });
      return null;
    }
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
