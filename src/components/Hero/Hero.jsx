import "./Hero.css";
import { useState, useEffect } from "react";
import { IoMdArrowRoundDown } from "react-icons/io";

const Hero = () => {
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
    <section
      className="hero"
      style={{
        marginTop: headerHeight + "px",
        minHeight: `calc(100vh - ${headerHeight}px)`,
      }}
    >
      {/* Floating Text */}
      <div className="hero-floating">Connecting Narsinghpur</div>

      {/* Main Heading */}
      <div className="hero-heading">
        <h1>खरीदें और बेचें</h1>
        <h1>अपने शहर में</h1>
      </div>

      {/* Sub Tagline */}
      <div className="hero-sub">Narsinghpur Ka Digital Bazaar</div>

      <button className="hero-btn">
        Explore Listings <IoMdArrowRoundDown />
      </button>

      {/* Stats */}
      <div className="hero-stats">
        <div className="stat">
          <p className="stat-num">500+</p>
          <p className="stat-label">Active Listings</p>
        </div>
        <div className="stat">
          <p className="stat-num">100+</p>
          <p className="stat-label">Happy Users</p>
        </div>
        <div className="stat">
          <p className="stat-num">Free</p>
          <p className="stat-label">To Use</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
