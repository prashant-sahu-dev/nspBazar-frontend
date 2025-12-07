import { useSelector } from "react-redux";
import Categories from "../components/Categories";
import Hero from "../components/Hero/Hero";
import { useRef } from "react";
import MarketPlace from "../components/MarketPlace/MarketPlace";

const Home = () => {
  const token = localStorage.getItem("token");
  const nextSectionRef = useRef(null);

  let products = useSelector((store) => store.items);

  return (
    <>
      <main>
        <Hero
          scrollToNext={() => {
            nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
        ></Hero>
        <div ref={nextSectionRef}>
    <MarketPlace />
  </div>
        {products.length === 0 && (
          <h2 className="no-items">No Products available</h2>
        )}
      </main>
    </>
  );
};

export default Home;
