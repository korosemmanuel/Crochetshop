import HighHero from "../assets/patt.jpg";
import "../App.css";
import { useRef } from "react";
import emailjs from "emailjs-com";
import { FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";
import { FaTiktok, FaXTwitter } from "react-icons/fa6";

function Contacts() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_mbv16ni",
        "template_wdpgyrm",
        form.current,
        "rtueoEYN14JwNGSsV"
      )
      .then(
        (result) => {
          alert("Message sent successfully!");
        },
        (error) => {
          alert("Failed to send message. Try again later.");
        }
      );
  };

  return (
    <main>
      {/* Hero Section */}
      <section
        className="heroPattern"
        style={{ "--1-hero": `url(${HighHero})` }}
      >
        <div className="heroPattern-content">
          <h1>Our Contacts</h1>
          <p className="heroPattern-breadcrumb">
            <a href="/">Home</a> / Contacts
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-container">
          {/* Contact Info */}
          <div className="contact-info">
            <h2>Contacts</h2>
            <p>
              <strong>Phone:</strong> +256 790 973 698
            </p>
            <p>
              <strong>Email:</strong> ascarkoros2@gmail.com
            </p>

            <h3>Address</h3>
            <p>Thika</p>
            <p>Monday to Friday 08:00am - 05:00pm</p>

            <h3>Social Media</h3>
            {/* Socials */}
            <div className="social-contact-links">
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
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <h2>Send us a message</h2>
            <form ref={form} onSubmit={sendEmail}>
              <input type="text" name="name" placeholder="Your name" required />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
              />
              <input type="text" name="phone" placeholder="Phone Number" />
              <textarea
                name="message"
                placeholder="Your message"
                rows="5"
                required
              />
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contacts;
