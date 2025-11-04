import "../App.css";
import WishHero from "../assets/wish.jpg";
import { useCart } from "../CartContext"; // ✅ to get cart items
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Checkout() {
  const { cart, subtotal } = useCart();

  return (
    <main>
      {/* Hero Section */}
      <section
        className="heroPattern"
        style={{ "--1-hero": `url(${WishHero})` }}
      >
        <div className="heroPattern-content">
          <h1>Checkout</h1>
          <p className="heroPattern-breadcrumb">
            <a href="/">Home</a> · Checkout
          </p>
        </div>
      </section>

      {/* Checkout Layout */}
      <section className="checkout-section">
        <div className="checkout-container">
          {/* Left Side - Express Checkout */}
          <div className="checkout-left">
            <h2>Express Checkout</h2>
            <PayPalScriptProvider options={{ "client-id": "test" }}>
              <PayPalButtons style={{ layout: "horizontal" }} />
            </PayPalScriptProvider>

            <hr />
            <p className="divider-text">Or continue below</p>

            {/* Empty placeholder for other payment methods */}
            <div className="other-payments">
              <h3>Other Payment Options</h3>
              <p>(Coming soon...)</p>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          {/* Right Side - Order Summary */}
          <div className="cart-totals">
            <h3>Order summary</h3>
            {cart.length === 0 ? (
              <p>No items in your cart.</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
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
                          Indulge yourself in the elegance of our Valentines
                          Crochet Dress, handcrafted with love using the finest
                          yarns...
                        </small>
                      </div>
                    </div>
                    <p className="cart-item-total">
                      ${(item.price * (item.quantity || 1)).toFixed(2)}
                    </p>
                  </div>
                ))}

                {/* ✅ Shared Totals */}
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
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Checkout;
