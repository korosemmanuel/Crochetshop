// pages/ProductPage.js
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import WishHero from "../assets/wish.jpg";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useWishlist } from "../WishlistContext";
import { useCart } from "../CartContext";
import API from "../api"; // adjust the path if needed
import { Link } from "react-router-dom";
import "../App.css";

function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  // const [related, setRelated] = useState([]);
  const [youMayLike, setYouMayLike] = useState([]);
  const [, setSdkReady] = useState(false);

  const [paypalClientId, setPaypalClientId] = useState(null);

  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const getPaypalClientId = async () => {
      const { data } = await API.get("/api/config/paypal");
      setPaypalClientId(data);
    };
    getPaypalClientId();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/slug/${slug}`);
      const data = await res.json();
      setProduct(data);
      console.log("🔍 Single product:", data);

      // // --- Related Products (by category, exclude current) ---
      // if (data.category) {
      //   const relatedRes = await fetch(`/api/products?category=${data.category}`);
      //   const relatedJson = await relatedRes.json();

      //   // unwrap products array
      //   let relatedData = relatedJson.products || [];
      //   let filteredRelated = relatedData.filter((p) => p.id !== data.id);

      //   if (!filteredRelated.length) {
      //     // fallback: load some products
      //     const fallbackRes = await fetch(`/api/products`);
      //     const fallbackJson = await fallbackRes.json();
      //     filteredRelated = (fallbackJson.products || []).filter(
      //       (p) => p.id !== data.id
      //     );
      //   }

      //   console.log("📦 Related products:", filteredRelated);
      //   setRelated(filteredRelated.slice(0, 4));
      // }

      // --- You May Also Like (by tags) ---
      if (data.tags?.length) {
        const likeRes = await fetch(
          `/api/products?tags=${encodeURIComponent(data.tags.join(","))}`
        );
        const likeJson = await likeRes.json();

        // unwrap
        let likeData = likeJson.products || [];
        let filteredLike = likeData.filter((p) => p.id !== data.id);

        if (!filteredLike.length) {
          // fallback: pick random products
          const fallbackRes = await fetch(`/api/products`);
          const fallbackJson = await fallbackRes.json();
          filteredLike = (fallbackJson.products || []).filter(
            (p) => p.id !== data.id
          );
        }

        console.log("💡 You may also like:", filteredLike);
        setYouMayLike(filteredLike.slice(0, 4));
      }
    };

    fetchProduct();

    // --- PayPal SDK ---
    const addPayPalScript = async () => {
      const { data: clientId } = await API.get(
        "/api/config/paypal"
      );
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => setSdkReady(true);
      document.body.appendChild(script);
    };

    if (!window.paypal) {
      addPayPalScript();
    } else {
      setSdkReady(true);
    }
  }, [slug]);

  if (!product) return <p className="product-not-found">Loading...</p>;

  const successPaymentHandler = (paymentResult) => {
    console.log("PayPal Success:", paymentResult);
    alert("Payment successful with PayPal!");
  };
  console.log(product.description, Array.isArray(product.description));
  const desc = Array.isArray(product.description)
    ? product.description
    : JSON.parse(product.description);

  return (
    <main>
      {/* Hero */}
      <section
        className="heroPattern"
        style={{ "--1-hero": `url(${WishHero})` }}
      >
        <div className="heroPattern-content">
          <h1>{product.name}</h1>
          <p className="heroPattern-breadcrumb">
            <a href="/">Home</a> · {product.category}
          </p>
        </div>
      </section>

      {/* Product Layout */}
      <div className="product-container">
        {/* Left */}
        <div className="product-gallery">
          <img
            src={product.image}
            alt={product.name}
            className="product-main-image"
          />
        </div>

        {/* Right */}
        <div className="product-details">
          <h2 className="product-title">{product.name}</h2>
          <p className="product-price">${product.price}</p>
          <small>
            At Ascarcrochets, every design is crafted with precision and
            creativity, offering timeless, high-quality crochet wear that blends
            style, comfort, and individuality.
          </small>

          {/* Cart Actions */}
          <div className="product-actions">
            {isInCart(product.id) ? (
              <Link to="/cart" className="btn-cart-link">
                <FaShoppingCart /> In Cart
              </Link>
            ) : (
              <button className="btn-cart" onClick={() => addToCart(product)}>
                <FaShoppingCart /> Add to Cart
              </button>
            )}
          </div>

          {/* Wishlist */}
          <div className="wishlist-actions">
            {isInWishlist(product.id) ? (
              <div className="wishlist-added">
                <button
                  className="btn1-wishlist"
                  onClick={() => toggleWishlist(product)}
                >
                  <FaHeart className="wishlist-icon" />
                </button>
                <Link to="/wishlist" className="wish-link">
                  Browse Wishlist
                </Link>
              </div>
            ) : (
              <button
                className="btn1-wishlist"
                onClick={() => toggleWishlist(product)}
              >
                <FaHeart className="wishlist-icon" /> Add to Wishlist
              </button>
            )}
          </div>

          {/* Payments */}
          <div className="payment-options">
            {paypalClientId && (
              <PayPalScriptProvider options={{ "client-id": paypalClientId }}>
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: product.price.toFixed(2),
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      alert(
                        `Transaction completed by ${details.payer.name.given_name}`
                      );
                      successPaymentHandler(details);
                    });
                  }}
                />
              </PayPalScriptProvider>
            )}
          </div>

          <div className="product-meta">
            <p>
              <span>Category:</span> {product.category}
            </p>
            <p>
              <span>Tags:</span> {product.tags?.join(", ")}
            </p>
          </div>
        </div>
      </div>

      {/* Extra Sections */}
      <div className="product-extra">
        <h3>Description</h3>
        <div className="product-description-long">
          {desc.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        {/* You May Also Like */}

        <div className="youmaylike">
          <div>
            <h3>Related Products</h3>
          </div>
          <div className="product-cards">
            {youMayLike.length ? (
              youMayLike.map((item, idx) => (
                <div key={idx} className="product-card">
                  <Link to={`/products/${item.slug}`}>
                    <img src={item.image} alt={item.name} />
                  </Link>
                  <Link to={`/products/${item.slug}`} className="product-links">
                    <h4>{item.name}</h4>
                  </Link>
                  <p>${item.price}</p>
                </div>
              ))
            ) : (
              <p>No suggestions found.</p>
            )}
          </div>
        </div>

        {/* Related */}

        {/* <div className="youmaylike">
          <div><h3>Related Products</h3></div>
          <div className="product-cards">
            {related.length ? (
              related.map((item, idx) => (
                <div key={idx} className="product-card">
                  <img src={item.image} alt={item.name} />
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                </div>
              ))
            ) : (
              <p>No related products.</p>
            )}
          </div>  
        </div> */}
      </div>
    </main>
  );
}

export default ProductPage;
