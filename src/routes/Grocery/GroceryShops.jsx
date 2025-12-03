import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { shopActions } from "../../store/shopSlice";
import { fetchAllShops } from "../../services/shopService";
import { Link } from "react-router-dom";
import "./GroceryShops.css";
import Loader from "../../components/Loader";

const GroceryShops = () => {
  const dispatch = useDispatch();
  const { shops, error } = useSelector((state) => state.shops);
   
  const [loading, setLoading] = useState(false);

  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const loadShops = async () => {
      setLoading(true);
      try {
        console.log("initial shops:",shops);
        const response = await fetchAllShops();
        console.log("Fetched Shops:", response.data.shops);
        dispatch(shopActions.setShops(response.data.shops));
        setLoading(false);
      } catch (err) {
        dispatch(shopActions.setError("Failed to load shops"));
      }
    };

    loadShops();
  }, [dispatch]);

  useEffect(() => {
    const header = document.querySelector(".header");
    const updateHeight = () => {
      if (header) setHeaderHeight(header.offsetHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (<>{loading ? <Loader/> :
    <div
      className="shops-container"
      style={{
        marginTop: headerHeight + "px",
        minHeight: `calc(100vh - ${headerHeight}px)`,
      }}
    >
      <h1>Grocery Shops</h1>
      <p>Choose your favourite local store</p>

      <div className="shops-grid">
        {shops.map((shop) => (
          <div key={shop._id} className="shop-card">
            <img src={shop.image} alt={shop.name} />

            <h2>{shop.name}</h2>
            <p>{shop.address}</p>

            <Link className="view-btn" to={`/shop/${shop.name}/${shop._id}`}>
              View Items
            </Link>
          </div>
        ))}
      </div>
    </div>
}</>);
};

export default GroceryShops;
