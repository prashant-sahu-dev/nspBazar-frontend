import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ShopProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("shop_token");

  if (!token || token === "undefined" || token === "null") {
    return <Navigate to="/shop/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    // token expired?
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("shop_token");
      return <Navigate to="/shop/login" replace />;
    }
    localStorage.setItem("shop_id", JSON.stringify(decoded.id));
    localStorage.setItem("shop_name", decoded.shopName);

  } catch (err) {
    console.log("Invalid token");
    return <Navigate to="/shop/login" replace />;
  }

  return children;
};

export default ShopProtectedRoute;
