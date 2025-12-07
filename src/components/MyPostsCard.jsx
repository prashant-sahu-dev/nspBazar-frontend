
import "./MyPostsCard.css";
import { MdLocationOn } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const MyPostsCard = ({ product }) => {
  const message = "I would like to buy your product";
  return (
    <div className="product-card">
      {/* Image */}
      <div className="product-img">
        <img src={product.image} alt={product.title} />
        {product.deliveryAvailable && (
          <span className="delivery-badge">Delivery Available</span>
        )}
      </div>

      {/* Content */}
      <div className="product-content">
        <h2 className="product-title">{product.title}</h2>

        <p className="location">
          <span className="icon">
            <MdLocationOn />
          </span>{" "}
          {product.location}
        </p>

        <p className="price">₹{product.price.toLocaleString()}</p>

        <p className="desc">{product.description}</p>

        <div className="action-buttons">
          <button
            className="delete-btn"
            onClick={() => (window.location.href = `tel:${product.mobile}`)}
          >
            <RiDeleteBin6Line /> &nbsp;Delete
          </button>
        </div>

        <p className="seller">Seller: {product.seller}</p>
      </div>
    </div>
  );
};

export default MyPostsCard;
