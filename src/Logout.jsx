import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  localStorage.removeItem("user_permissions");

  localStorage.clear();
  
  window.location.href="/";

};

export default Logout;
