import HighHero from "../assets/patt.jpg";
import "../App.css";

function About() {
  return (
    <main>
      {/* Hero Section */}
      <section
        className="heroPattern"
        style={{ "--1-hero": `url(${HighHero})` }}
      >
        <div className="heroPattern-content">
          <h1>About Ascar Crochets</h1>
          <p className="heroPattern-breadcrumb">
            <a href="/">Home</a> / About
          </p>
        </div>
      </section>

      {/* About Content */}
      <section
        className="about-section"
        style={{
          padding: "0px 20px",
          maxWidth: "900px",
          margin: "0 auto",
          marginBottom: "40px",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            fontWeight: "bold",
            marginTop: "40px",
          }}
        >
          All you need to know about Ascar Crochet
        </h2>

        <p>
          Hi, I’m Ascar Koros, the hands and heart behind Ascarcrochets. I’m a
          self-taught crocheter who fell in love with yarn and hooks back in
          2018. What started as a hobby has grown into a passion for creating
          unique, handmade pieces that bring beauty, comfort, and confidence to
          anyone who wears them.
        </p>
        <p>
          At Ascarcrochets, every design is crafted with precision and
          creativity, offering timeless, high-quality crochet wear that blends
          style, comfort, and individuality
        </p>
        <div className="about-images">
          <img src="/images/about1.jpg" alt="About 1" />
        </div>
        <p>
          We have been designing, creating, and selling our pieces online since
          2025. Our online store is safe and easy to use – you having fun and
          feeling safe while shopping is our priority.
        </p>
        <p>
          We love Instagram and seeing all the amazing people from everywhere in
          the world wearing Ascarcrochets brings a smile to us every day. If you
          don’t know our Instagram yet, make sure to take a look{" "}
          <b>@Ascarcrochets</b>.
        </p>
      </section>
    </main>
  );
}

export default About;
