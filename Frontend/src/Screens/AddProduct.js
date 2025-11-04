import { useState } from "react";

function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    category: "pattern",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("Product added!");
  };

  return (
    <div className="add-product">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} />
        <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
        <input name="price" type="number" placeholder="Price" onChange={handleChange} />
        <input name="image" placeholder="Image URL" onChange={handleChange} />
        <select name="category" onChange={handleChange}>
          <option value="pattern">Pattern</option>
          <option value="featured">Featured</option>
          <option value="readytowear">ReadyToWear</option>
        </select>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
