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

// ---------- COMPONENT ----------
const ShopItems = () => {
  const { shopId } = useParams(); // React Router hook to read dynamic params. :contentReference[oaicite:0]{index=0}
  const dispatch = useDispatch();
  
  const {items: itemsByShop} = useSelector((state) => state.shops);
  const items = itemsByShop[shopId] || []; // Get items for the current shop
  // For fixed header adjustment, same pattern as before
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const fetchItems = async (shopId) => {
      try {
        
        const response = await fetchItemsByShop(shopId);
        console.log("Fetched items:", response.data);

        dispatch(
          shopActions.setItemsForShop({
            shopId,
            items: response.data.items,
          })
        );

    
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

  return (
    <div
      className="shop-items-container"
      style={{
        marginTop: `${headerHeight}px`,
        minHeight: `calc(100vh - ${headerHeight}px)`,
      }}
    >
      <h1 className="shop-items-title">Items Available</h1>

      {/* Grid wrapper for cards */}
      <div className="items-grid">
        {items.map((item) => (
          <ShopItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ShopItems;
