import { useState, useEffect } from "react";
import "../App.css";
import WishHero from "../assets/wish.jpg";
import { FaTimes } from "react-icons/fa";
import { useCart } from "../CartContext"; // ✅ import context

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState("");
  const { addToCart } = useCart(); // ✅ use global addToCart

  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    showMessage("Product removed from wishlist successfully ✅");
  };

  const handleAddToCart = (item) => {
    addToCart(item); // ✅ directly updates CartContext + localStorage
    removeFromWishlist(item.id); // ✅ still removes from wishlist
    showMessage("Product added to cart successfully ✅");
  };

  return (
    <main>
      {/* Hero Section */}
      <section
        className="heroPattern"
        style={{ "--1-hero": `url(${WishHero})` }}
      >
        <div className="heroPattern-content">
          <h1>Wishlist</h1>
          <p className="heroPattern-breadcrumb">
            <a href="/">Home</a> · Wishlist
          </p>
        </div>
      </section>

      {/* ✅ Success Message */}
      {message && <div className="success-message">{message}</div>}

      {/* Wishlist Table Section */}
      <section className="wishlist-section">
        <h2>My Wishlist</h2>
        <div className="wishlist-table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Product image</th>
                <th>Product name</th>
                <th>Unit price</th>
                <th>Stock status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="empty-wishlist"
                    style={{ textAlign: "center" }}
                  >
                    No products added to the wishlist
                  </td>
                </tr>
              ) : (
                wishlist.map((item) => (
                  <tr key={item.id}>
                    <td class="remove" style={{ textAlign: "end" }}>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "red",
                          fontSize: "1rem",
                        }}
                        title="Remove from wishlist"
                      >
                        <FaTimes />
                      </button>
                    </td>
                    <td class="image">
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                      />
                    </td>
                    <td class="name">{item.name}</td>
                    <td class="price">${item.price}</td>
                    <td class="stock">In stock</td>
                    <td class="cart">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="mini-link"
                        style={{ color: "green", cursor: "pointer" }}
                      >
                        Add to Cart
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Wishlist;
