import { useEffect, useState } from "react";

function Feature() {
  const [products, setProducts] = useState([]);
  const apiBase = process.env.REACT_APP_API_URL;


  useEffect(() => {
    fetch(`${apiBase}/api/products`)
      .then((res) => res.json())
      .then((data) =>
        setProducts(data.filter((p) => p.category === "feature"))
      );
  }, []);

  return (
    <div>
      <h2>Featured</h2>
      <div className="products-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.title} />
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <p>${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feature;
