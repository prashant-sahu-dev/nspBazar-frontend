import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { Link, useLocation } from "react-router-dom";
import { myItemsActions } from "../store/myItemsSlice";
import { itemsActions } from "../store/itemSlice";
import { FiHeart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { toast, Bounce } from "react-toastify";
import { FaWhatsapp } from "react-icons/fa";
import { VscCallOutgoing } from "react-icons/vsc";



import "./HomeItem.css";
import { wishlistActions } from "../store/wishlistSlice";

const HomeItem = ({ item }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const wishlistItems = useSelector((store) => store.wishlist);
  const isItemInWishlist = wishlistItems.some(
    (wishlistItem) => wishlistItem._id === item._id
  );

  const atMyPostsPage = location.pathname === "/myPost";


  const handleAddToWishlist = () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.warn("Please log in to add items to your wishlist!", {
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
      return;
    }

    const body = {
      productId: item._id,
      userId: userId,
    };
    if (isItemInWishlist) {
      //first remove the item from wishlist to update the UI
      dispatch(wishlistActions.removeItem(item._id));
      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/removeFromWishlist`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).catch((error) => {
        console.error("Error removing item from wishlist:", error);
      });
      return;
    } else {
      //first adding item to wishlist to update the UI
      dispatch(wishlistActions.addItem(item));
      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/addToWishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).catch((error) => {
        console.error("Error adding item to wishlist:", error);
      });
    }
  };
  const deleteItem = () => {
    const body = {
      itemId: item._id,
      userId: localStorage.getItem("userId"),
      imagePublicId: item.image // Assuming item.image contains the public ID,
    };
    
    // Optimistically update the UI by removing the item first
    dispatch(myItemsActions.deleteItem(item._id));
    dispatch(itemsActions.deleteItem(item._id));
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/items`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        console.log("Item deleted:", res);
        toast.warn("Item is removed!", {
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
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  return (
    <>
      <div class="item-container">
        {isItemInWishlist ? (
          <FiHeart
            className="wishlist-icon"
            color="red"
            size={32}
            onClick={handleAddToWishlist}
          />
        ) : (
          <FaRegHeart
            className="wishlist-icon"
            size={32}
            onClick={handleAddToWishlist}
          />
        )}
        <Link to={`/item/${item._id}`}>
          <img class="item-image" src={item.image} alt="item image" />
          <div class="price">
            <span class="current-price">Rs {item.price}</span>
          </div>
          <div class="item-name">{item.title}</div>
          <div class="company-name">{item.description}</div>

          <span class="address">({item.location})</span>
        </Link>
        
        {!atMyPostsPage && (
          <a href={`tel:${item.mobile}`} className="btn btn-primary">
            <VscCallOutgoing /> Call
          </a>
        )}
        
        {!atMyPostsPage && (
          <a
          href={`https://wa.me/${item.mobile}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-success"
        >
          <FaWhatsapp /> WhatsApp
        </a>
        )}
        

        {atMyPostsPage && (
          <button
            type="button"
            onClick={deleteItem}
            class="btn-delete-item btn btn-danger"
          >
            Delete Item
          </button>
        )}
      </div>
    </>
  );
};

export default HomeItem;
