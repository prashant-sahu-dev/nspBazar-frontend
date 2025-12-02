import ProductCard from "./ProductCard";
import "./ProductList.css";
import { useSelector } from 'react-redux';

const ProductList = () => {
  const products = useSelector(store => store.items) ;


  return (
    <div className="product-list">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductList;
