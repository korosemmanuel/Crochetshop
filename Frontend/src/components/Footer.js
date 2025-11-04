import React from "react";
import logo from "../logo3.jpg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Column - Contact Info */}
        <div className="footer-left">
          <p>
            <strong>Call Us:</strong> +254 790 973 698
          </p>
          <p>
            <strong>Email: </strong>
            <a href="mailto:shylercrochets@gmail.com" className="footer-link">
              ascarkoros2@gmail.com
            </a>
          </p>
          <p>
            <strong>Address:</strong> Thika
          </p>
          <p>Monday to Friday 08:00am to 05:00pm</p>
        </div>

        {/* Center Column - Logo */}
        <div className="footer-center">
          <img src={logo} alt="Shyler Crochets Logo" className="footer-logo" />
          {/* <p className="footer-brand">ASCAR CROCHETS</p>
          <p className="footer-tagline">fiber artist</p> */}
        </div>

        {/* Right Column - Payments */}
        <div className="footer-right">
          <p>
            Enjoy 100% secure and convenient
            <br />
            Online Payments
          </p>
          <div className="payment-icons">
            <img
              src="/paypal.jpg"
              alt="paypal"
              className="payment-icon paypal"
            />
            <img src="/visa.jpg" alt="visa" className="payment-icon visa" />
            <img src="/mom2.jpg" alt="MoMo" className="payment-icon momo" />
            <img
              src="/airtel.jpg"
              alt="airtel"
              className="payment-icon airtel"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
