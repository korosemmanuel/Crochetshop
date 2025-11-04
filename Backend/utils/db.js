// utils/db.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.PG_DB || "crochetshop",
  process.env.PG_USER || "postgres",
  process.env.PG_PASSWORD || "1234",
  {
    host: process.env.PG_HOST || "localhost",
    dialect: "postgres",
    logging: false, // set to console.log for debugging
  }
);

export default sequelize;
