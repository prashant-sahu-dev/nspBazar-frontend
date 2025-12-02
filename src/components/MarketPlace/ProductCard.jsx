import { FaPhoneAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import './ProductCard.css' ;
import { MdLocationOn } from "react-icons/md";

const ProductCard = ({ product }) => {
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
          <span className="icon"><MdLocationOn /></span> {product.location}
        </p>

        <p className="price">₹{product.price.toLocaleString()}</p>

        <p className="desc">{product.description}</p>

        <div className="action-buttons">
          <button className="call-btn">
            <FaPhoneAlt /> &nbsp;Call Seller
          </button>

          <button className="wa-btn">
            <IoLogoWhatsapp /> &nbsp;WhatsApp
          </button>
        </div>

        <p className="seller">Seller: {product.seller}</p>
      </div>
    </div>
  );
};

export default ProductCard;
