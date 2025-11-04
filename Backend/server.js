// server.js
import http from "http";
import { Server } from "socket.io";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Sequelize } from "sequelize";

import productRouter from "./routers/productRouter.js";
import mpesaRoutes from "./routers/mpesa.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ---- PostgreSQL Connection ----
const sequelize = new Sequelize(
  process.env.PG_DB || "crochetshop",
  process.env.PG_USER || "postgres",
  process.env.PG_PASSWORD || "1234",
  {
    host: process.env.PG_HOST || "localhost",
    dialect: "postgres",
  }
);

sequelize
  .authenticate()
  .then(() => console.log("✅ PostgreSQL connected"))
  .catch((err) => console.error("❌ Error connecting to PostgreSQL:", err));

// Routers
app.use("/api/products", productRouter);
app.use("/api", mpesaRoutes);

// Config endpoints
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.get("/api/config/google", (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || "");
});

// Health check
app.get("/", (req, res) => {
  res.send("Server is ready 🚀");
});

// Error handling
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// ---- SOCKET.IO ----
const port = process.env.PORT || 5000;
const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

httpServer.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
