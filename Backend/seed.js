// seed.js
import dotenv from "dotenv";
import sequelize from "./utils/db.js";
import data from "./data.js";
import Product from "./models/productModel.js";

dotenv.config();

const importData = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected");

    // Sync schema (drops old table + recreates)
    await sequelize.sync({ force: true });
    console.log("🗑️ Tables dropped & recreated");

    // Insert products
    const createdProducts = await Product.bulkCreate(data.products);
    console.log(`🎉 ${createdProducts.length} products added`);

    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err.message);
    process.exit(1);
  }
};

importData();
