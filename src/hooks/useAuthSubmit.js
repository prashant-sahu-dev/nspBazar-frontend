// src/hooks/useAuthSubmit.js
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLoginActions } from "../store/isLoginSlice";
import { wishlistActions } from "../store/wishlistSlice";
import { toast, Bounce } from "react-toastify";

export const useAuthSubmit = (setLoading, setError, isLogin, nameRef, emailRef, passwordRef) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = nameRef.current?.value || "";
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!isValidEmail(email)) {
      setLoading(false);
      return setError("Invalid Email Format");
    }

    if (password.length < 8) {
      setLoading(false);
      return setError("Password length must be at least 8 characters");
    }

    const formData = isLogin ? { email, password } : { name, email, password };

    const url = isLogin
      ? `${import.meta.env.VITE_API_BASE_URL}/auth/login`
      : `${import.meta.env.VITE_API_BASE_URL}/auth/signup`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("userName", data.user.name);
        dispatch(isLoginActions.setLogin(true));


        setLoading(false);
        toast.success("Login/Signup Success ✅");

        navigate("/");
      } else {
        setLoading(false);
        toast.error(data.message || "Something went wrong ❌");
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.message || "Something went wrong ❌");
    }
    
  };

  return handleSubmit;
};
