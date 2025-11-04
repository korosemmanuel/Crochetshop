import "../App.css";
import WishHero from "../assets/wish.jpg";
import { useCart } from "../CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    showMessage("Item removed from cart successfully ✅");
  };

  return (
    <main>
      {" "}
      {/* ✅ Now footer gets pushed down */}
      {/* Hero Section */}
      <section
        id="home"
        className="heroPattern"
        style={{ "--1-hero": `url(${WishHero})` }}
      >
        <div className="heroPattern-content">
          <h1>Cart</h1>
          <p className="heroPattern-breadcrumb">
            <a href="/">Home</a> · Cart
          </p>
        </div>
      </section>
      {/* ✅ Success Message */}
      {message && <div className="success-message">{message}</div>}
      {/* Cart Section */}
      <section className="cart-section">
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          <div className="cart-container">
            {/* Left Side - Product */}
            <div className="cart-products">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-info">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-img"
                    />
                    <div>
                      <h3 className="cart-item-title">{item.name}</h3>
                      <p className="cart-item-price">
                        ${item.price.toFixed(2)}
                      </p>
                      <small>
                        This listing is for a pdf file, NOT for a physical
                        product. By purchasing this digital file…
                      </small>

                      {/* Quantity Controls */}
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, -1)}>
                          -
                        </button>
                        <span>{item.quantity || 1}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}>
                          +
                        </button>
                      </div>

                      {/* Remove Item */}
                      <p
                        className="remove-item"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove item
                      </p>
                    </div>
                  </div>

                  {/* Total Price */}
                  <p className="cart-item-total">
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Side - Cart Totals */}
            <div className="cart-totals">
              <h3>Cart totals</h3>
              <div className="cart-coupon">
                <select>
                  <option>Add a coupon</option>
                </select>
              </div>
              <div className="cart-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="cart-row total">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Cart;
