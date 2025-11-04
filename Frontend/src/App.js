import "./App.css";
import logo from "./logo3.jpg";
import {
  FaSearch,
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";
import { FaTiktok, FaXTwitter } from "react-icons/fa6";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import { useCart } from "./CartContext";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom"; // ⬅️ add this import

// Screens
import Home from "./Screens/Home";
import Patterns from "./Screens/Patterns";
import Featured from "./Screens/Featured";
import Wishlist from "./Screens/Wishlist";
import Cart from "./Screens/Cart";
import About from "./Screens/About";
import Contacts from "./Screens/Contacts";
import ReadyToWear from "./Screens/ReadyToWear";
import ProductScreen from "./Screens/ProductScreen";
import WhatsAppWidget from "./Screens/WhatsappWidget";
import Checkout from "./Screens/Checkout";
// import { screen } from '@testing-library/react';

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const { cart, subtotal, searchQuery, setSearchQuery } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Search data
  const [hoveredItem, setHoveredItem] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
      const apiBase = process.env.REACT_APP_API_URL;

    Promise.all([
      fetch(`${apiBase}/api/products?type=pattern`).then((r) =>
        r.json()
      ),
      fetch(`${apiBase}/api/products?type=featured`).then((r) =>
        r.json()
      ),
    ]).then(([patterns, featured]) => {
      const arr1 = Array.isArray(patterns) ? patterns : patterns.products || [];
      const arr2 = Array.isArray(featured) ? featured : featured.products || [];
      setAllProducts([...arr1, ...arr2]);
    });
  }, []);

  const filteredResults = allProducts.filter((item) =>
    (item?.name || "").toLowerCase().includes((searchQuery || "").toLowerCase())
  );
  // state
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-content">
          {/* Logo */}
          <div className="logo-section">
            <a href="/">
              <img src={logo} alt="Shyler Crochets Logo" className="logo" />
            </a>
            {/* <h1 className="brand">ASCAR CROCHETS</h1>
            <p className="tagline">fiber artist</p> */}
          </div>

          {/* Wishlist & Cart */}
          <div className="wishlist-cart">
            <Link to="/wishlist" className="wishlist">
              <FaHeart /> Wishlist
            </Link>
            <Link to="/cart" className="cart">
              <FaShoppingCart /> {totalItems} items - ${subtotal.toFixed(2)}
            </Link>
          </div>

          {/* Search (input + dropdown) */}
          <div className="search-area">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="clear-btn"
                  aria-label="Clear search"
                  onClick={() => setSearchQuery("")}
                >
                  ✕
                </button>
              )}
            </div>

            {searchQuery &&
              ReactDOM.createPortal(
                <div className="search-popover">
                  {/* Header with back + input */}
                  <div className="search-header">
                    <button
                      className="back-btn"
                      onClick={() => setSearchQuery("")} // clears search & closes overlay
                    >
                      ←
                    </button>
                    <input
                      type="text"
                      placeholder="Search for products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <div className="results-list">
                    {filteredResults.length > 0 ? (
                      filteredResults.map((item) => (
                        <div
                          key={item.id}
                          className="search-item"
                          onMouseEnter={() => setHoveredItem(item)}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="thumb"
                          />
                          <Link
                            to={`/products/${item.slug}`}
                            className="search-name"
                            onClick={() => setSearchQuery("")} // clear popup after click
                          >
                            {item.name}
                          </Link>
                        </div>
                      ))
                    ) : (
                      <p className="no-results">
                        No results for "{searchQuery}"
                      </p>
                    )}
                  </div>

                  <div className="preview-pane">
                    {hoveredItem || filteredResults[0] ? (
                      <div>
                        <img
                          src={(hoveredItem || filteredResults[0]).image}
                          alt={(hoveredItem || filteredResults[0]).name}
                        />
                        <p
                          style={{
                            textAlign: "center",
                            marginTop: "6px",
                            fontSize: "0.9rem",
                          }}
                        >
                          {(hoveredItem || filteredResults[0]).name}
                        </p>
                      </div>
                    ) : (
                      <div className="preview-placeholder"></div>
                    )}
                  </div>
                </div>,
                document.body
              )}
          </div>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
          {/* Nav */}
          {/* Dropdown Nav */}
          <nav className={`nav ${menuOpen ? "open" : ""}`}>
            <ul>
              <li>
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  HOME
                </Link>
              </li>
              <li>
                <Link to="/patterns" onClick={() => setMenuOpen(false)}>
                  PATTERNS
                </Link>
              </li>
              <li>
                <Link to="/ready" onClick={() => setMenuOpen(false)}>
                  READY TO WEAR
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setMenuOpen(false)}>
                  ABOUT
                </Link>
              </li>
              <li>
                <Link to="/contacts" onClick={() => setMenuOpen(false)}>
                  CONTACTS
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="wishlist-toggle"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaHeart /> Wishlist
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="cart-toggle"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaShoppingCart /> {totalItems} items - ${subtotal.toFixed(2)}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Socials */}
          <div className="social-links">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a
              href="https://youtube.com/@ascarcrochets?si=NeTG5ng-PAf7fyVU"
              target="_blank"
              rel="noreferrer"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.tiktok.com/@ascarcrochets?_t=ZM-8zUw7VYde2X&_r=1"
              target="_blank"
              rel="noreferrer"
            >
              <FaTiktok />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaXTwitter />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
          </div>

          {/* Sidebar Footer */}
          <footer className="sidebar-footer">
            <p>Copyright © 2025 Ascar Crochets. All rights reserved.</p>
          </footer>
        </div>
      </aside>

      {/* Main Body */}
      <main className={`main-content ${isHome ? "home" : "with-footer"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patterns" element={<Patterns />} />
          <Route path="/featured" element={<Featured />} />
          <Route path="/ready" element={<ReadyToWear />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/products/:slug" element={<ProductScreen />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>

        <Footer />
        {/* Your site content */}
        <WhatsAppWidget />
      </main>
    </div>
  );
}

export default App;
