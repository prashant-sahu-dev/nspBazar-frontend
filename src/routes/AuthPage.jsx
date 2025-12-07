import { useState, useRef, useEffect } from "react";
import "./AuthPage.css"; // CSS file import
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { isLoginActions } from "../store/isLoginSlice";
import Loader from "../components/Loader";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import { useAuthSubmit } from "../hooks/useAuthSubmit";
import { jwtDecode } from "jwt-decode";

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [headerHeight, setHeaderHeight] = useState(0);

  const toggleForm = () => setIsLogin(!isLogin);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = useAuthSubmit(
    setLoading,
    setError,
    isLogin,
    nameRef,
    emailRef,
    passwordRef
  );
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      setLoading(true);
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google user:", decoded);

      // Extract useful info
      const name = decoded.name;
      const email = decoded.email;
      const googleId = decoded.sub; // unique google id

      // ---- Option A: Send token to backend for verification & login ----
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/googleLogin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, googleId }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("userName", data.user.name);

        dispatch(isLoginActions.setLogin(true));

        setLoading(false);
        toast.success("Google Login Success ✅");

        navigate("/");
      } else {
        toast.error(data.message);
      }

      // ---- Option B (quick local login without backend) ----
      // localStorage.setItem("token", credentialResponse.credential);
      // localStorage.setItem("userId", googleId);
      // localStorage.setItem("userName", name);
      // dispatch(isLoginActions.setLogin(true));
      // navigate("/");
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed ❌", {
        position: "top-center",
        autoClose: 4000,
        theme: "dark",
        transition: Bounce,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    const header = document.querySelector(".header");

    const updateHeight = () => {
      if (header) setHeaderHeight(header.offsetHeight);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <>
      <Header />

      {loading ? (
        <Loader />
      ) : (
        <div
          className="auth"
          style={{
            marginTop: headerHeight + "px",
            minHeight: `calc(100vh - ${headerHeight}px)`,
          }}
        >
          <div className="auth__box">
            <h2 className="auth__title">{isLogin ? "Login" : "Sign Up"}</h2>

            <form className="auth__form" onSubmit={handleSubmit}>
              {!isLogin && (
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  ref={nameRef}
                  required
                />
              )}

              <input
                type="email"
                name="email"
                placeholder="Email"
                ref={emailRef}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                ref={passwordRef}
                required
              />

              <button type="submit" className="auth__btn">
                {isLogin ? "Login" : "Sign Up"}
              </button>

              {error && <p className="auth__error">{error}</p>}

              <div className="auth__google">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    handleGoogleLogin(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
            </form>

            <p className="auth__toggle">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span className="auth__link" onClick={toggleForm}>
                {isLogin ? "Sign Up" : "Login"}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export default AuthPage;
