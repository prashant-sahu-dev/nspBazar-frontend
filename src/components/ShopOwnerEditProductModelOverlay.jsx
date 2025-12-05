import { useDispatch, useSelector } from "react-redux";
import { editShopItem } from "../services/shopService";
import "./ShopOwnerEditProductModelOverlay.css";
import { useRef, useState } from "react";
import { shopActions } from "../store/shopSlice";
import { categories } from "../routes/Grocery/ShopItems";
import { Triangle } from 'react-loader-spinner'

import { toast } from "sonner";

const ShopOwnerEditProductModelOverlay = ({ item, setIsEditing }) => {
  const dispatch = useDispatch();

  const shopId = localStorage.getItem("shop_id");

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const nameRef = useRef();
  const weightRef = useRef();
  const mrpRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();
  const imageRef = useRef();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (imageFile) {
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
      formData.append("name", nameRef.current.value);
      formData.append("weight", weightRef.current.value);
      formData.append("mrp", mrpRef.current.value);
      formData.append("price", priceRef.current.value);
      formData.append("category", categoryRef.current.value);
      formData.append("image", imageFile);

      try {
        const response = await editShopItem(item._id, formData, true);
        console.log("Form submitted", response.data.item);

          dispatch(
        shopActions.editItemInShop({
          shopId: shopId,
          itemId: item._id,
          updatedItem: response.data.item,
        })
      );
    }
      catch(error){
        console.error("Error updating item with image:", error);
        toast.error("Failed to update item with image. Please try again.");
      }
    }
    else{
    const updatedItem = {
      name: nameRef.current.value,
      weight: weightRef.current.value,
      mrp: mrpRef.current.value,
      price: priceRef.current.value,
      category: categoryRef.current.value,
    };
    try {
      const response = await editShopItem(item._id, updatedItem, false);
      console.log("Form submitted", response.data.item);

        dispatch(
        shopActions.editItemInShop({
          shopId: shopId,
          itemId: item._id,
          updatedItem: response.data.item,
        })
      );
      
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Failed to update item. Please try again.");
    }
  }

      toast.success("Item updated successfully!");
      setLoading(false);
      setIsEditing(false);
  };
  return (
    <div className="edit-product-modal">

      <div className="epm-overlay" ></div>
      {!loading ? (
      <div className="epm-content">
        <button className="epm-close-btn" onClick={() => setIsEditing(false)}>
          ✖
        </button>

        <h3>Edit Product</h3>

        <form className="epm-form" onSubmit={handleOnSubmit}>
          <div className="epm-row">
            <div className="epm-group">
              <label>Product Name</label>
              <input
                type="text"
                ref={nameRef}
                defaultValue={item.name}
                required
              />
            </div>

            <div className="epm-group">
              <label>Weight</label>
              <input
                type="text"
                ref={weightRef}
                defaultValue={item.weight}
                required
              />
            </div>
          </div>

          <div className="epm-row">
            <div className="epm-group">
              <label>MRP</label>
              <input
                type="number"
                ref={mrpRef}
                defaultValue={item.mrp}
                required
              />
            </div>

            <div className="epm-group">
              <label>Price</label>
              <input
                type="number"
                ref={priceRef}
                defaultValue={item.price}
                required
              />
            </div>
          </div>

          <div className="epm-row">
            <div className="epm-group">
              <label>Categories</label>
              <select ref={categoryRef} defaultValue={item.category} required>
                <option value="" disabled hidden>
                  Select category
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="epm-group">
              <label htmlFor="imageFile">Image URL</label>
              <input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </div>
          </div>

          <button type="submit" className="epm-submit">
            Save Product
          </button>
        </form>
      </div>) : (<Triangle
      height={100}
      width={100}
      radius={9}
      color="White"
      ariaLabel="audio-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />)}
    </div>
  );
};

export default ShopOwnerEditProductModelOverlay;
