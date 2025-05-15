// routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("token"); // یا هر روش دیگه‌ای برای تشخیص لاگین
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
