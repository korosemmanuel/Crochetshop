import React from "react";

const WhatsAppWidget = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
          position: "fixed",
          bottom: "20px",
          right: "20px",
          marginRight: "70px",
          maxWidth: "160px",
          background: "#eee9e9ff",
          padding: "12px 1px",
          borderRadius: "5px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
          zIndex: 1000,
        }}
      >
        <a
          href="https://wa.me/254702782956"
          className="Whatsapp"
          target="_blank" // ✅ open in new tab
          rel="noopener noreferrer" // ✅ security best practice
          style={{
            textDecoration: "none", // ✅ removes underline
            color: "#000000ff", // ✅ set text color
            fontSize: "11px",
          }}
        >
          Need a custom order? <b>Chat with us</b>
        </a>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
          position: "fixed",
          bottom: "10px",
          right: "20px",
          marginRight: "5px",
          zIndex: 1000,
        }}
      >
        <a
          href="https://wa.me/254702782956"
          className="whatsapp_float"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }} // ✅ make sure icon link isn’t underlined either
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            style={{ width: "40px", height: "40px" }}
          />
        </a>
      </div>
    </>
  );
};

export default WhatsAppWidget;
