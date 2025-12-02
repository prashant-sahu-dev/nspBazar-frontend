import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { LuShoppingBag } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";
import "./Header.css";

const Header = () => {
  const bag = useSelector((store) => store.bag);
  const isLogin = useSelector((store) => store.isLogin); 
  const cart = useSelector((state)=>state.cart) ; 

  return (
    <>
      <header className="header">
        <Link to="/" className="header-left">
          <div className="logo-box">
            <LuShoppingBag />
          </div>

          <div className="brand-text">
            <h2 className="brand-title">nspBazaar</h2>
            <p className="brand-tagline">Narsinghpur ka apna Bazaar</p>
          </div>
        </Link>

        <div className="header-right">
          <Link to="/grocery" className="btn groceries-btn">
            <BsBoxSeam /> Groceries
          </Link>

          <Link to="/cart" className="btn cart-btn">
            <IoCartOutline />{cart.items.length}
          </Link>

          <button className="btn post-btn">
            + Post Your Item
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
