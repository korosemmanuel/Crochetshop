// models/productModel.js
import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js"; // <-- this should export your Sequelize instance

const Product = sequelize.define(
  "Product",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    category: { type: DataTypes.STRING },
    tags: { type: DataTypes.ARRAY(DataTypes.STRING) },
  },
  {
    timestamps: true,
  }
);

export default Product;
