import "./ShopDashboard.css";
import { useEffect, useState, useRef  } from "react";
import ShopOwnerItemCard from "../../../components/ShopOwnerItemCard";
import { useDispatch, useSelector} from "react-redux";
import { fetchItemsByShop , addItemToShop} from "../../../services/shopService";
import { shopActions } from "../../../store/shopSlice";

import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { MdCancel } from "react-icons/md";

const ShopDashBoard = () => {
  const dispatch = useDispatch();
  const productNameRef = useRef();
  const weightRef = useRef();
  const mrpRef = useRef();
  const priceRef = useRef();
  const imageUrlRef = useRef();

  const shopId = localStorage.getItem("shop_id");
  const shopName = localStorage.getItem("shop_name");

  const { items: itemsByShop } = useSelector((state) => state.shops);
  const items = itemsByShop[shopId] || [];

  const [headerHeight, setHeaderHeight] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const onLogout = () => {
    localStorage.removeItem("shop_token");
    localStorage.removeItem("shop_id");
    localStorage.removeItem("shop_name");
    console.log("Logged out successfully");
  };

  const handleAddProductSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      shopId,
      name: productNameRef.current.value,
      weight: weightRef.current.value,
      mrp: mrpRef.current.value,
      price: priceRef.current.value,
      image: imageUrlRef.current.value,
    };
    const response = await addItemToShop(newItem);
    dispatch(
      shopActions.addItemToShop({
        shopId,
        item: response.data.item,
      })
    );
    console.log("Item added successfully:", response.data);
    // Here you would typically send newItem to the backend API to save it
    // After successful addition, you might want to refresh the items list
  }

  useEffect(() => {
    const header = document.querySelector(".header");
    const updateHeight = () => {
      if (header) setHeaderHeight(header.offsetHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetchItemsByShop(shopId);
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
    fetchItems();
  }, []);

  return (
    <div style={{
        marginTop: `${headerHeight}px`,
        minHeight: `calc(100vh - ${headerHeight}px)`,
      }} className="shop-dashboard-container">

        {/* Top Banner */}
      <div className="shop-banner">
        <h2>{shopName}</h2>

        <div className="banner-actions">
          {!isAdding ? (
            <button className="add-post-btn" onClick={() => setIsAdding(true)}>
              <AiOutlinePlusCircle size={20} />
              Add Item
            </button>
          ) : (
            <button className="cancel-btn" onClick={() => setIsAdding(false)}>
              <MdCancel size={20} />
              Cancel
            </button>
          )}

          <button className="logout-btn" onClick={onLogout}>
            <FiLogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    <div
      className="shop-dashboard"
    >
      

      {/* Add Product Form */}
      {isAdding && (
        <div className="add-product-box">
          <h3>Add New Product</h3>

          <form className="add-product-form" onSubmit={handleAddProductSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="productName">Product Name</label>
                <input
                  id="productName"
                  type="text"
                  placeholder="Product Name"
                  ref={productNameRef}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="weight">Weight</label>
                <input
                  id="weight"
                  type="text"
                  placeholder="Weight (e.g., 1kg / 500g)"
                  ref={weightRef}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="mrp">MRP</label>
                <input id="mrp" type="number" placeholder="MRP" ref={mrpRef} required />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input id="price" type="number" placeholder="Price" ref={priceRef} required />
              </div>
            </div>
            <div className="form-row">
            <div className="form-group">
              <label htmlFor="imageUrl">Image URL</label>
              <input id="imageUrl" type="text" placeholder="Image URL" ref={imageUrlRef} required />
            </div>
            </div>
            <div className="form-row">
            <button type="submit" className="submit-btn">
              Save Product
            </button>
            </div>
          </form>
        </div>
      )}

      {/* Heading */}
      <h3 className="products-heading">Your Products</h3>

      {/* Items Grid */}
      <div className="items-grid">
        {items.map((item) => (
          <ShopOwnerItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default ShopDashBoard;
