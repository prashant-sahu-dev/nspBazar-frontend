import "./Categories.css";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import './Categories.css';

// import required modules
import { FreeMode, Pagination } from "swiper/modules";


const Categories = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const categories = [
  { name: "Book", image: "/images/categories/books.png" },
  { name: "Electronics", image: "/images/categories/electronics.png" },
  { name: "Furniture", image: "/images/categories/furniture.png" },
  { name: "Property", image: "/images/categories/properties.png" },
  { name: "Clothing", image: "/images/categories/fashion.png" },
  { name: "AutoMobiles", image: "/images/categories/vehicles.png" },
  { name: "Other", image: "/images/categories/other.png" },
];


  return (
    <>
    {isMobile ? (
      <Swiper
        slidesPerView="auto"
        spaceBetween={5}
        freeMode={true}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index} style={{ width: "100px" }}>
            <Link to={`/category/${category.name.toLowerCase()}`} className="category-link">
              <img
                src={category.image}
                alt={category.name}
                className="category-img"
              />
              <span>{category.name}</span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    ) : (
      <div className="categories-list">
        {categories.map((category, index) => (
          <Link to={`/category/${category.name.toLowerCase()}`} className="category-link" key={index}>
            <img
              src={category.image}
              alt={category.name}
              className="category-img"
            />
            <span>{category.name}</span>
          </Link>
        ))}
      </div>
    )}
    </>
  );
};



export default Categories;
