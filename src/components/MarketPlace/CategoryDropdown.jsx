import "./CategoryDropdown.css";

const CategoryDropdown = () => {
  return (
    <select className="category-dropdown">
      <option value="">All Categories</option>
      <option value="books">Books & Notes</option>
      <option value="electronics">Electronics</option>
      <option value="grocery">Groceries</option>
      <option value="fashion">Fashion</option>
    </select>
  );
};

export default CategoryDropdown;
