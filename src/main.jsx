import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./routes/App.jsx";
import Cart from "./routes/Cart.jsx";
import Home from "./routes/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import myntraStore from "./store/index.js";
import AddPost from "./routes/AddPost.jsx";
import AuthPage from "./routes/AuthPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import GroceryShops from "./routes/Grocery/GroceryShops.jsx";
import ShopItems from "./routes/Grocery/ShopItems.jsx";
import ShopOwnerLogin from "./routes/ShopOwners/Login/ShopOwnerLogin.jsx";
import ShopDashboard from "./routes/ShopOwners/ShopDashBoard/ShopDashboard.jsx";
import ShopProtectedRoute from "./components/ShopProtectedRoute.jsx";
import { Toaster } from "sonner";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/addPost",
        element: (
          <ProtectedRoute>
            <AddPost />
          </ProtectedRoute>
        ),
      },
      {
        path: "/grocery",
        element: <GroceryShops />,
      },
      {
        path: "/shop/:shopName/:shopId", 
        element: <ShopItems />,
      },
       {
        path: "/shop/login",
        element: <ShopOwnerLogin/>
       },
      {
        path: "/shop-owners",
        element: <ShopProtectedRoute><ShopDashboard /></ShopProtectedRoute>
      }
    ],
  },

  {
    path: "/login",
    element: <AuthPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="397608238006-equbap7begks871rkf1pfbav6mr3t8bb.apps.googleusercontent.com">
    <Provider store={myntraStore}>
      <RouterProvider router={router} />
      <Toaster position="top-right" duration={2000} richColors closeButton />
    </Provider>
    </GoogleOAuthProvider>;
  </StrictMode>
);
