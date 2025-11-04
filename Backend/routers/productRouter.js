import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import { Op } from "sequelize";

const productRouter = express.Router();

// ✅ Debug: return all products
productRouter.get(
  "/debug",
  expressAsyncHandler(async (req, res) => {
    const all = await Product.findAll();
    res.json(all);
  })
);

// ✅ GET /api/products?type=pattern&category=hat&page=1&limit=6
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const { type, category, page = 1, limit = 6 } = req.query;
    let where = {};

    if (type) {
      where.type = { [Op.iLike]: type }; // case-insensitive exact match
    }
    if (category) {
      where.category = { [Op.iLike]: category };
    }

    // 🔒 Safe conversion of query params
    const pageNum = Math.max(Number(page) || 1, 1);
    const limitNum = Math.max(Number(limit) || 6, 1);
    const offset = (pageNum - 1) * limitNum;

    const { count, rows } = await Product.findAndCountAll({
      where,
      offset,
      limit: limitNum,
    });

    res.json({
      products: rows,
      totalPages: Math.ceil(count / limitNum),
      currentPage: pageNum,
    });
  })
);

// ✅ Fetch product by slug
productRouter.get(
  "/slug/:slug",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findOne({ where: { slug: req.params.slug } });
    if (product) {
      res.json(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

// ✅ Fetch product by ID
productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

// ✅ Create new product
productRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const newProduct = await Product.create(req.body);
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  })
);

export default productRouter;
