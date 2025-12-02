import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import { FaArrowLeft } from "react-icons/fa6";
import { PiTrashBold } from "react-icons/pi";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const subtotal = cart.items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const delivery = subtotal > 0 ? 20 : 0;
  const total = (Number(subtotal) + delivery).toFixed(2);

  const continueShoppingUrl = cart.items.length>0 ? `/shop/${cart.items[0].shopId}` : "/grocery";

  // WhatsApp Checkout Message
  const whatsappMessage = encodeURIComponent(
    `Hello, I want to place an order:\n\n${cart.items
      .map(
        (item) =>
          `${item.name} (${item.weight}) - ₹${item.price} x ${
            item.quantity
          } = ₹${item.price * item.quantity}`
      )
      .join(
        "\n"
      )}\n\nSubtotal: ₹${subtotal}\nDelivery: ₹${delivery}\nTotal: ₹${total}`
  );

  // For fixed header adjustment, same pattern as before
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector(".header");

    const updateHeight = () => {
      if (header) setHeaderHeight(header.offsetHeight);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div
      className="cart-container"
      style={{
        marginTop: `${headerHeight}px`,
        minHeight: `calc(100vh - ${headerHeight}px)`,
      }}
    >
      <div className="cart-heading-container">
        <h1>Your Cart</h1>
        <Link to= {continueShoppingUrl} className="btn continue-shopping-btn">
          <FaArrowLeft />
          Continue Shopping
        </Link>
      </div>
      {cart.items.length === 0 ? (
        <div className="empty-cart">
          <img src="/images/empty-cart.png" alt="empty" />
          <h2>Your cart is empty</h2>
          <p>Add items to proceed</p>
        </div>
      ) : (
        <div className="cart-flex">
          {/* Left Section - Items */}
          <div className="cart-left">
            {cart.items.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p className="weight">{item.weight}</p>

                  <p className="price">
                    ₹{item.price} × {item.quantity} ={" "}
                    <b>₹{item.price * item.quantity}</b>
                  </p>

                  <div className="qty-controls">
                    <button
                      onClick={() => {
                        try {
                          dispatch(cartActions.decreaseQty(item.id));
                        } catch (err) {
                          if (err.message === "DIFFERENT_STORE") {
                            // show modal: "Cart has items from X. Clear to switch?"
                          }
                        }
                      }}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => {
                        try {
                          dispatch(cartActions.increaseQty(item.id));
                        } catch (err) {
                          if (err.message === "DIFFERENT_STORE") {
                            // show modal: "Cart has items from X. Clear to switch?"
                          }
                        }
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => {
                    try {
                      dispatch(cartActions.removeFromCart(item._id));
                    } catch (err) {
                      if (err.message === "DIFFERENT_STORE") {
                        // show modal: "Cart has items from X. Clear to switch?"
                      }
                    }
                  }}
                >
                  <PiTrashBold color="red" size={25} />
                </button>
              </div>
            ))}
          </div>

          {/* Right Section - Summary */}
          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Charge</span>
              <span>₹{delivery}</span>
            </div>

            <hr />

            <div className="summary-total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <a
              className="whatsapp-btn"
              href={`https://wa.me/918989458464?text=${whatsappMessage}`}
              target="_blank"
            >
              Checkout on WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
