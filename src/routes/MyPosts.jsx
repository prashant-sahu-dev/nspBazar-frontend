import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { myItemsActions } from "../store/myItemsSlice";
import MyPostsCard from "../components/MyPostsCard";
import "./MyPosts.css";

import Loader from "../components/Loader";
import { toast, Bounce } from "react-toastify";
const MyPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);
   
    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      navigate("/");
    } ;
    useEffect(() => {
      const header = document.querySelector(".header");
  
      const updateHeight = () => {
        if (header) setHeaderHeight(header.offsetHeight);
      };
  
      updateHeight();
      window.addEventListener("resize", updateHeight);
  
      return () => window.removeEventListener("resize", updateHeight);
    }, []);

  const myItems = useSelector((state) => state.myItems);

  useEffect(() => {
    setLoading(true);
    // Check if user is logged in
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("You need to be logged in to view your posts.", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

      navigate("/login"); // Redirect to login if not logged in
    }
    fetch(`${import.meta.env.VITE_API_BASE_URL}/myPosts/${userId}`)
      .then((res) => res.json())
      .then((data) => {
 
        dispatch(myItemsActions.addItems(data.myItems));
      })
      .catch((err) => {
        console.error("Error fetching user's posts:", err);
      })
      .finally(() => {
        setLoading(false); // ✅ Moved here
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="my-posts-container" style={{
        marginTop: headerHeight + "px",
      }}>
         <button className="logout-btn" onClick={handleLogout}>← Logout</button>
         <div className="my-posts-items-container">
            {myItems.map((item) => (
              <MyPostsCard key={item.id} product={item}></MyPostsCard>
            ))}
          </div>
          </div>
          {myItems.length === 0 && <h2 className="no-items">No Post yet</h2>}
        </>
      )}
    </>
  );
};

export default MyPost;
