import Header from "../components/Header";
import Footer from "../components/Footer";
import "./AddPost.css";
import { useRef, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { itemsActions } from "../store/itemSlice";
import Loader from "../components/Loader";
import { toast } from "sonner";


const AddPost = () => {
  const [loading, setLoading] = useState(false);
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

  const titleRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();
  const locationRef = useRef();
  const mobileRef = useRef();
  const ownerNameRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sanitizeMobile = () => {
    if (!mobileRef.current) return;
    // keep digits only and limit to 10 chars
    const cleaned = mobileRef.current.value.replace(/\D/g, "").slice(0, 10);
    mobileRef.current.value = cleaned;
  };

  const isMobileValid = () => {
    const val = mobileRef.current ? mobileRef.current.value : "";
    return /^\d{10}$/.test(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ensure mobile sanitized before validation
    sanitizeMobile();

    if (!isMobileValid()) {
      // show error (toast or set error UI)
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", titleRef.current.value);
    formData.append("category", categoryRef.current.value);
    formData.append("price", priceRef.current.value);
    formData.append("seller", localStorage.getItem("userName"));
    formData.append("description", descriptionRef.current.value);
    formData.append("image", imageRef.current.files[0]);
    formData.append("location", locationRef.current.value);
    formData.append("mobile", mobileRef.current.value);
    formData.append("userId", localStorage.getItem("userId"));

    console.log("formdata", formData);
   
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/items`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(itemsActions.addItem(data.item));
        toast.success("Item added successfully!") ;

        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  };

  return (
    <>
  {loading ? (
    <Loader />
  ) : (
    <main className="addpost" style={{
        marginTop: headerHeight + "px",
        minHeight: `calc(100vh - ${headerHeight}px)`,
      }}>
      <section className="addpost__card">
        <h2 className="addpost__title">Add New Item</h2>

        <form className="addpost__form" onSubmit={handleSubmit}>
          <div className="addpost__grid">

            <div className="addpost__field">
              <label htmlFor="title">Item Name/Title</label>
              <input type="text" id="title" ref={titleRef} required />
            </div>

            <div className="addpost__field">
              <label htmlFor="category">Category</label>
              <select id="category" ref={categoryRef} required>
                <option value="">Select Category</option>
                <option value="book">Books</option>
                <option value="electronics">Electronics</option>
                <option value="furniture">Furniture</option>
                <option value="properties">Properties</option>
                <option value="clothing">Clothing</option>
                <option value="automobiles">AutoMobiles</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="addpost__field">
              <label htmlFor="price">Price</label>
              <input type="number" id="price" ref={priceRef} min="0" required />
            </div>

            <div className="addpost__field addpost__field--full">
              <label htmlFor="description">Description</label>
              <textarea id="description" rows="3" ref={descriptionRef} required />
            </div>

            <div className="addpost__field">
              <label htmlFor="image">Image</label>
              <input type="file" id="image" accept="image/*" ref={imageRef} required />
            </div>

            <div className="addpost__field">
              <label htmlFor="location">Location</label>
              <input type="text" id="location" ref={locationRef} required />
            </div>

            <div className="addpost__field">
              <label htmlFor="mobile">Mobile Number</label>
              <div className="addpost__mobile">
                <span className="addpost__mobile-prefix">+91</span>
                <input
                  type="text"
                  id="mobile"
                  ref={mobileRef}
                  onInput={sanitizeMobile}
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="Enter 10-digit mobile"
                  required
                />
              </div>
            </div>

          </div>

          <button type="submit" className="addpost__btn">Submit</button>
        </form>
      </section>
    </main>
  )}
</>

  );
};

export default AddPost;
