import Header from "../components/Header";
import Footer from "../components/Footer";
import "./AddPost.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { itemsActions } from "../store/itemSlice";
import Loader from "../components/Loader";
import { toast, Bounce } from "react-toastify";

const AddPost = () => {
  const [loading, setLoading] = useState(false);

  const titleRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();
  const locationRef = useRef();
  const mobileRef = useRef();

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
      toast.error("Please enter a valid 10-digit mobile number.", {
        position: "top-center",
        autoClose: 4000,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", titleRef.current.value);
    formData.append("category", categoryRef.current.value);
    formData.append("price", priceRef.current.value);
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
        toast.success("Item added successfully!", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });

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
          <main className="addpost-main">
          <section className="addpost-card">
            <h2 className="addpost-title">Add New Item</h2>
            <form className="addpost-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label htmlFor="title">Item Name/Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  ref={titleRef}
                  required
                />
              </div>
              <div className="form-row">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  ref={categoryRef}
                  required
                >
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
              <div className="form-row">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  ref={priceRef}
                  required
                  min="0"
                />
              </div>
              <div className="form-row">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  ref={descriptionRef}
                  rows="3"
                  required
                />
              </div>
              <div className="form-row">
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  ref={imageRef}
                  required
                />
              </div>
              <div className="form-row">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  ref={locationRef}
                  required
                />
              </div>
              <div className="form-row">
                <label htmlFor="mobile">Mobile Number</label>
                <div className="mobile-input">
                  <span
                    style={{
                      background: "#f7f7fa",
                      border: "1px solid #e0e0e0",
                      borderRadius: "6px",
                      padding: "8px 10px",
                      fontSize: "1rem",
                    }}
                  >
                    +91
                  </span>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    ref={mobileRef}
                    onInput={sanitizeMobile} // uses ref to sanitize without state
                    inputMode="numeric"
                    pattern="\d{10}"
                    maxLength={10}
                    placeholder="Enter 10-digit mobile"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="addpost-btn">
                Submit
              </button>
            </form>
          </section>
          </main>
        )}
    </>
  );
};

export default AddPost;
