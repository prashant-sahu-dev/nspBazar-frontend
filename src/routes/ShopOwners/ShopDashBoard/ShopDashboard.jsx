import "./ShopDashboard.css";
import { useEffect, useState, useRef } from "react";
import ShopOwnerItemCard from "../../../components/ShopOwnerItemCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsByShop, addItemToShop } from "../../../services/shopService";
import { shopActions } from "../../../store/shopSlice";

import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { categories } from "../../Grocery/ShopItems";
import Loader from "../../../components/Loader";

const ShopDashBoard = () => {
  const dispatch = useDispatch();
  const productNameRef = useRef();
  const weightRef = useRef();
  const mrpRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef("Select your item category");

  const navigate = useNavigate();
  const shopId = localStorage.getItem("shop_id");
  const shopName = localStorage.getItem("shop_name");

  const { items: itemsByShop } = useSelector((state) => state.shops);
  const items = itemsByShop[shopId] || [];

  const [headerHeight, setHeaderHeight] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onLogout = () => {
    localStorage.removeItem("shop_token");
    localStorage.removeItem("shop_id");
    localStorage.removeItem("shop_name");
    toast.success("Logged out successfully!");
    navigate("/shop/login", { replace: true }); // <-- ye sahi hai
  };

  const handleAddProductSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!imageFile) {
      setLoading(false);
      return toast.error("Please select an image!");
    }

    // validate image type
    if (!imageFile.type.startsWith("image/")) {
      setLoading(false);
      return toast.error("Only image files are allowed!");
    }

    // validate file size (2MB)
    if (imageFile.size > 2 * 1024 * 1024) {
      setLoading(false);
      return toast.error("Image size must be under 2MB!");
    }

    const formData = new FormData();
    formData.append("shopId", shopId);
    formData.append("name", productNameRef.current.value);
    formData.append("weight", weightRef.current.value);
    formData.append("mrp", mrpRef.current.value);
    formData.append("price", priceRef.current.value);
    formData.append("category", categoryRef.current.value);
    formData.append("image", imageFile); // file upload

    try {
      const response = await addItemToShop(formData);

      dispatch(
        shopActions.addItemToShop({
          shopId,
          item: response.data.item,
        })
      );

      // Reset
      if (productNameRef.current) productNameRef.current.value = "";
      if (weightRef.current) weightRef.current.value = "";
      if (mrpRef.current) mrpRef.current.value = "";
      if (priceRef.current) priceRef.current.value = "";
      if (categoryRef.current) categoryRef.current.value = "";

      setImageFile(null);

      toast.success("Item added successfully!");
      setIsAdding(false);
      setLoading(false);
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("Failed to add item. Please try again.");
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
    <div
      style={{
        marginTop: `${headerHeight}px`,
        minHeight: `calc(100vh - ${headerHeight}px)`,
      }}
      className="shop-dashboard-container"
    >
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

      {!loading ? (
        <div className="shop-dashboard">
          {/* Add Product Form */}
          {isAdding && (
            <div className="add-product-box">
              <h3>Add New Product</h3>

              <form
                className="add-product-form"
                onSubmit={handleAddProductSubmit}
              >
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
                    <input
                      id="mrp"
                      type="number"
                      placeholder="MRP"
                      ref={mrpRef}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                      id="price"
                      type="number"
                      placeholder="Price"
                      ref={priceRef}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="category">Categories</label>
                    <select
                      id="category"
                      name="category"
                      ref={categoryRef}
                      required
                    >
                      <option value="" disabled hidden>
                        Select your item category
                      </option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="imageFile">Image File</label>
                    <input
                      id="imageFile"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])}
                      required
                    />
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
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ShopDashBoard;
