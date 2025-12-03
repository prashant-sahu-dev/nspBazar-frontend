import "./ShopOwnerLogin.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BsShop } from "react-icons/bs";

const ShopOwnerLogin = () => {
  const [headerHeight, setHeaderHeight] = useState(0);

  // ---- useRef for form fields ----
  const shopNameRef = useRef();
  const passcodeRef = useRef();

  useEffect(() => {
    const header = document.querySelector(".header");
    const updateHeight = () => {
      if (header) setHeaderHeight(header.offsetHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const shopName = shopNameRef.current.value;
    const passcode = passcodeRef.current.value;

    try {
      console.log("Attempting login for shop:", shopName, passcode);
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/groceryAuth/groceryShopLogin`, {
        shopName,
        passcode,
      });

      localStorage.setItem("shop_token", res.data.token);
      
      console.log("Login Successful:", res.data);

      alert("Login Successful!");
      // window.location.href = "/shop/dashboard";
      window.location.href = "/shop-owners";

    } catch (err) {
      console.error("here is the error message:", err);
      alert("Invalid Shop ID or Passcode: "+ err.message);
    }
  };

  return (
    <div
      className="shop-owner-login-container"
      style={{
        marginTop: headerHeight + "px",
        minHeight: `calc(100vh - ${headerHeight}px)`,
      }}
    >
      <div className="shop-owner-login-box">
        <div className="shop-owner-login-icon-container">
          <BsShop className="login-icon" />
        </div>
        <h2>Shop Owner Login</h2>
        <p>Manage your grocery products</p>

        <form className="shop-owner-login-form" onSubmit={handleSubmit}>
          <label htmlFor="shopName">Shop Name:</label>
          <select id="shopName" name="shopName" ref={shopNameRef} required>
            <option value="" disabled selected hidden>
              Select your shop
            </option>
            <option value="Classic Collection">Classic Collection</option>
            <option value="Krishna super market">Krishna Super Market</option>
            <option value="Bhau kirana">Bhau Kirana</option>
          </select>

          <label htmlFor="passcode">Passcode</label>
          <input
            type="password"
            id="passcode"
            name="passcode"
            placeholder="Enter your passcode"
            ref={passcodeRef}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default ShopOwnerLogin;
