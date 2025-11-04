import { useEffect, useState } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useWishlist } from "../WishlistContext";
import HighHero from "../assets/patt.jpg";
import { useCart } from "../CartContext";
import "../App.css";

function ReadyToWear() {
  const [ready, setReady] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { addToCart, isInCart } = useCart(); // 🚨 Removed searchQuery here
  const { toggleWishlist, isInWishlist } = useWishlist();
  const PRODUCTS_PER_PAGE = 6;

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/products?type=readytowear&page=${page}&limit=${PRODUCTS_PER_PAGE}`
    )
      .then((res) => res.json())
      .then((data) => {
        setReady(data.products || []);
        setTotalPages(data.totalPages || 1);
      });
  }, [page]);

  return (
    <main>
      {/* Hero Section */}
      <section
        className="heroPattern"
        style={{ "--1-hero": `url(${HighHero})` }}
      >
        <div className="heroPattern-content">
          <h1>Ready To Wear</h1>
          <p className="heroPattern-breadcrumb">
            <a href="/">Home</a> · Ready To Wear
          </p>
        </div>
      </section>

      {/* Section Title */}
      <section id="sectionPattern" className="section patterns">
        <div className="patterns1-header">
          <div className="patterns-title">
            <span>TOP</span>
            <span>SKIRTS</span>
            <span>DRESS</span>
            <span>& MORE</span>
          </div>
          <div className="patterns-collection">READY TO WEAR COLLECTION</div>
        </div>

        {/* Products Grid */}
        <div className="patterns-grid">
          {ready.map((item) => (
            <div key={item.id} className="pattern-card">
              <div className="image-wrapper">
                {/* Product image links to product detail */}
                <Link to={`/products/${item.slug}`}>
                  <img src={item.image} alt={item.name} />
                </Link>

                {/* Overlay icons */}
                <div className="card-actions">
                  {/* Cart */}
                  {isInCart(item.id) ? (
                    <>
                      <button
                        className="icon-btn"
                        onClick={() => !isInCart(item.id) && addToCart(item)}
                      >
                        <FaShoppingCart />
                      </button>
                      <Link to="/cart" className="mini-link">
                        View cart
                      </Link>
                    </>
                  ) : (
                    <button
                      className="icon-btn"
                      onClick={() => addToCart(item)}
                    >
                      <FaShoppingCart />
                    </button>
                  )}

                  {/* Wishlist */}
                  {isInWishlist(item.id) ? (
                    <div className="wishlist-added">
                      <FaHeart className="wishlist-icon" />
                      <div className="wishlist-texts">
                        <p className="wishlist-text">Product added!</p>
                        <Link to="/wishlist" className="mini-link">
                          Browse wishlist
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <button
                      className="icon-btn"
                      onClick={() => toggleWishlist(item)}
                    >
                      <FaHeart />
                    </button>
                  )}
                </div>
              </div>

              {/* Product name & price */}
              <Link to={`/products/${item.slug}`} className="product-links">
                <h3>{item.name}</h3>
              </Link>
              <p>${item.price}</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              className={`page-btn ${num === page ? "active" : ""}`}
              onClick={() => setPage(num)}
            >
              {num}
            </button>
          ))}
          {page < totalPages && (
            <button className="page-btn" onClick={() => setPage(page + 1)}>
              →
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

export default ReadyToWear;
