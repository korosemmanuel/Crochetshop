import "../App.css";
import leftHero from "../assets/left-hero.png";
import rightHero from "../assets/right-hero.png";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useWishlist } from "../WishlistContext";
import { useCart } from "../CartContext";
import { Link } from "react-router-dom";

function Home() {
  const [patterns, setPatterns] = useState([]);
  const [featured, setFeatured] = useState([]);

  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart(); // ✅ no searchQuery here

  useEffect(() => {
    fetch("http://localhost:5000/api/products?type=pattern")
      .then((res) => res.json())
      .then((data) => setPatterns(data.products || []));

    fetch("http://localhost:5000/api/products?type=featured")
      .then((res) => res.json())
      .then((data) => setFeatured(data.products || []));
  }, []);

  const renderProductCard = (item) => (
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
            <button className="icon-btn" onClick={() => addToCart(item)}>
              <FaShoppingCart />
            </button>
          )}

          {/* Wishlist */}
          {isInWishlist(item.id) ? (
            <div className="wishlist-added">
              <div className="wishlist-top">
                <FaHeart className="wishlist-icon" />
                <p className="wishlist-text">Product added!</p>
              </div>
              <Link to="/wishlist" className="mini-link">
                Browse wishlist
              </Link>
            </div>
          ) : (
            <button className="icon-btn" onClick={() => toggleWishlist(item)}>
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
  );

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="section hero"
        style={{
          "--left-hero": `url(${leftHero})`,
          "--right-hero": `url(${rightHero})`,
        }}
      >
        <div className="hero-content">
          <h1>Welcome to Ascar Crochets</h1>
          <p>Handmade crochet products crafted with love.</p>
          <a href="/patterns" className="shop-btn">
            Shop Now
          </a>
        </div>
      </section>
      <div className="hero-cont">
        <h2>Welcome to Ascar Crochets</h2>
        <p>Handmade crochet products crafted with love.</p>
        <a href="/patterns" className="shop-btn-cont">
          Shop Now
        </a>
      </div>

      {/* Patterns Section */}
      <section id="patterns" className="section patterns">
        <div className="patterns-header">
          <div className="patterns-title">
            <span>TOP</span>
            <span>SKIRTS</span>
            <span>DRESS</span>
            <span>& MORE</span>
          </div>
          <div className="patterns-center">PATTERNS</div>
          <a href="/patterns" className="view-all">
            View All Patterns →
          </a>
        </div>

        <div className="patterns-grid">
          {patterns.length > 0 ? (
            patterns.map(renderProductCard)
          ) : (
            <p className="no-results">No patterns available</p>
          )}
        </div>
      </section>

      {/* YouTube Promo Section */}
      <section id="youtube" className="youtube-promo">
        <div className="youtube-left">
          <i className="fab fa-youtube youtube-icon"></i>
          <h2>Subscribe To Our Youtube Channels</h2>
          <p className="channel">
            <a
              href="https://youtube.com/@ascarcrochets?si=NeTG5ng-PAf7fyVU"
              target="_blank"
              rel="noreferrer"
              className="youtube-handle"
            >
              @ascar_crochets
            </a>
          </p>
          <p className="desc">
            Contemporary wardrobe staples and authentic style for the modern man
            and women. Subscribe for the latest. Tag us and get featured <br />
            @ascar_crochets
          </p>
        </div>
        <div className="youtube-right">
          <img src="/youtube.jpg" alt="Crochet Showcase" />
        </div>
      </section>

      {/* Featured Section */}
      <section id="featured" className="section featured">
        <div className="featured-header">
          <div className="featured-title">
            <span>TOP</span>
            <span>SKIRTS</span>
            <span>DRESS</span>
            <span>& MORE</span>
          </div>
          <div className="featured-center">FEATURED PRODUCTS</div>
          <a href="/featured" className="view-all">
            View All Products →
          </a>
        </div>

        <div className="patterns-grid">
          {featured.length > 0 ? (
            featured.map(renderProductCard)
          ) : (
            <p className="no-results">No featured products available</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
