import { useDispatch, useSelector } from 'react-redux';
import { editShopItem } from '../services/shopService';
import './ShopOwnerEditProductModelOverlay.css' ;
import {useRef} from 'react' ;
import { shopActions } from '../store/shopSlice';

const ShopOwnerEditProductModelOverlay = ({ item, setIsEditing }) => {
  const dispatch = useDispatch() ;

  const shopId = localStorage.getItem("shop_id");

  const nameRef = useRef() ;
  const weightRef = useRef() ;
  const mrpRef = useRef() ;
  const priceRef = useRef() ;
  const imageRef = useRef() ;

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const updatedItem = {
      name: nameRef.current.value,
      weight: weightRef.current.value,
      mrp: mrpRef.current.value,
      price: priceRef.current.value,
      image: imageRef.current.value,
    };
    try{
      const response = await editShopItem(item._id, updatedItem);
      console.log("Form submitted", response.data.item);
      dispatch(shopActions.editItemInShop({ shopId: shopId, itemId: item._id, updatedItem: response.data.item }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
    return (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setIsEditing(false)}>✖</button>
          <h3>Edit Product</h3>

          <form className="add-product-form" onSubmit={handleOnSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="productName">Product Name</label>
                <input
                  id="productName"
                  type="text"
                  placeholder="Product Name"
                  ref={nameRef}
                  defaultValue={item.name}
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
                  defaultValue={item.weight}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="mrp">MRP</label>
                <input id="mrp" type="number" placeholder="MRP" ref={mrpRef} defaultValue={item.mrp}required />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input id="price" type="number" placeholder="Price" ref={priceRef} defaultValue={item.price} required />
              </div>
            </div>
            <div className="form-row">
            <div className="form-group">
              <label htmlFor="imageUrl">Image URL</label>
              <input id="imageUrl" type="text" placeholder="Image URL" ref={imageRef} defaultValue={item.image} required />
            </div>
            </div>
            <div className="form-row">
            <button type="submit" className="submit-btn">
              Save Product
            </button>
            </div>
          </form>
          </div>
        </div>
    ) ;
};

export default ShopOwnerEditProductModelOverlay ;