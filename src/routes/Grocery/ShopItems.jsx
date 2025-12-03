import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ShopItemCard from "./ShopItemCard";
import { cartActions } from "../../store/cartSlice";
import "./ShopItems.css"; // optional, but useful for grid styling
import { useDispatch } from "react-redux";
import { fetchItemsByShop } from "../../services/shopService";
import { shopActions } from "../../store/shopSlice";
import { useSelector } from "react-redux";
import { fetchStatusActions } from "../../store/fetchStatusSlice";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";

// ---------- COMPONENT ----------
const ShopItems = () => {
  const { shopId, shopName } = useParams(); // React Router hook to read dynamic params. :contentReference[oaicite:0]{index=0}
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {items: itemsByShop} = useSelector((state) => state.shops);
  const items = itemsByShop[shopId] || []; // Get items for the current shop
  // For fixed header adjustment, same pattern as before
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const fetchItems = async (shopId) => {
      try {
        setLoading(true);
        const response = await fetchItemsByShop(shopId);
        console.log("Fetched items:", response.data);

        dispatch(
          shopActions.setItemsForShop({
            shopId,
            items: response.data.items,
          })
        );
        setLoading(false);
    
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems(shopId);
  }, [shopId]);

  useEffect(() => {
    const header = document.querySelector(".header");

    const updateHeight = () => {
      if (header) setHeaderHeight(header.offsetHeight);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []); // using effect for DOM read; this is a valid use of useEffect. :contentReference[oaicite:1]{index=1}

  return (<>{loading ? <Loader/> : 
    <div
      className="shop-items-page"
      style={{
        marginTop: `${headerHeight}px`,
        minHeight: `calc(100vh - ${headerHeight}px)`,
      }}
    > 
    <div className="shopItems-shopBanner">
        <Link to="/grocery" className="shopItems-back-button btn">← Back to Shops</Link>
        <h1 className="shopItems-shopName">{shopName}</h1>
        <p>Your Trusted grocery store for daily need</p>
      </div>

    <div className="shop-items-container">

      {/* Grid wrapper for cards */}
      <div className="items-grid">
        {items.map((item) => (
          <ShopItemCard key={item._id} item={item} />
        ))}
      </div>
      </div>
    </div>
  }</>);
};

export default ShopItems;
