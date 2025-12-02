import "./ShopItemCard.css";
import { cartActions } from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const ShopItemCard = ({ item }) => {
  const dispatch = useDispatch();

  // GET QTY FROM REDUX
  const cartItem = useSelector((state) =>
    state.cart.items.find((p) => p._id === item._id)
  );

  const qty = cartItem ? cartItem.quantity : 0;

  const discount = Math.round(((item.mrp - item.price) / item.mrp) * 100);

  const handleAddToCart = () => {
    try {
      dispatch(cartActions.addToCart(item));
    } catch (err) {
      if (err.message === "DIFFERENT_STORE") {
        alert('you are selecting the item from other store') ;
      }
    }
  };

  const handleIncreaseQty = () => {
    try {
      dispatch(cartActions.increaseQty(item._id));
    } catch (err) {}
  };

  const handleDecreaseQty = () => {
    try {
      dispatch(cartActions.decreaseQty(item._id));
    } catch (err) {}
  };

  return (
    <div className="shop-item-card">
      <div className="item-img">
        <img src={item.image} alt={item.name} />
        <span className="discount-badge">{discount}% OFF</span>
      </div>

      <h3 className="item-name">{item.name}</h3>
      <p className="item-weight">{item.weight}</p>

      <div className="price-row">
        <p className="mrp">₹{item.mrp}</p>
        <p className="price">₹{item.price}</p>
      </div>

      {qty === 0 ? (
        <button className="add-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      ) : (
        <div className="qty-controls">
          <button onClick={handleDecreaseQty}>−</button>
          <span>{qty}</span>
          <button onClick={handleIncreaseQty}>+</button>
        </div>
      )}
    </div>
  );
};

export default ShopItemCard;
