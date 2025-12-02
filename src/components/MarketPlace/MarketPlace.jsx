import SearchBar from "./SearchBar";
import CategoryDropdown from "./CategoryDropdown";
import ProductList from "./ProductList";
import "./Marketplace.css";

const Marketplace = () => {
  
  return (
    <section className="marketplace">
      <div className="top-filters">
        <SearchBar />
        <CategoryDropdown />
      </div>
      <ProductList />
    </section>
  );
};

export default Marketplace;
