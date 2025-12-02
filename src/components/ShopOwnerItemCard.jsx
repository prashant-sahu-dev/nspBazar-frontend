import "./ShopOwnerItemCard.css";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import ShopOwnerEditProductModelOverlay from "../components/ShopOwnerEditProductModelOverlay";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeShopItem } from "../services/shopService";
import { shopActions } from "../store/shopSlice";

const ShopOwnerItemCard = ({ item, }) => {
  const [isEditing, setIsEditing] = useState(false);
 const dispatch = useDispatch() ;
 const shopId = localStorage.getItem("shop_id") ;
  const onDelete = async (itemId) => {
    // Implement delete functionality here
    try{
      console.log("Deleting item foe shopId", shopId, "itemId:", itemId, "typeof itemId:", typeof itemId, "typeof shopId:", typeof shopId);
      const response = await removeShopItem(itemId);
      dispatch(shopActions.removeItemFromShop({ shopId: shopId, itemId: itemId }));
      alert("Item deleted successfully:", response.data.message);
    }
   catch(error){
    console.error("Error deleting item:", error);
    alert("Failed to delete item. Please try again.");
   }
  }
  return (
    <>
    <div className="owner-item-card">
      <div className="owner-item-img">
        <img src={item.image} alt={item.name} />
      </div>

      <h3 className="owner-item-name">{item.name}</h3>
      <p className="owner-item-weight">{item.weight}</p>

      <div className="owner-price-row">
        <p className="owner-mrp">₹{item.mrp}</p>
        <p className="owner-price">₹{item.price}</p>
      </div>

      <div className="owner-actions">
        <button className="edit-btn" onClick={() => { setIsEditing(true); }}>
          <FiEdit />
        </button>
        <button className="delete-btn" onClick={() => onDelete(item._id)}>
          <RiDeleteBinLine />
        </button>
      </div>
    </div>
    {/* editing modal  */}
    {isEditing && (
      <ShopOwnerEditProductModelOverlay
        item={item} setIsEditing={setIsEditing}/>)}
        </>
  )
};

export default ShopOwnerItemCard;
