const express = require("express");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ADD PRODUCT (Protected)
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { title, description, price, category, image, barterAllowed } = req.body;

    const product = await Product.create({
      title,
      description,
      price,
      category,
      image,
      barterAllowed,
      seller: req.user.id,
    });

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ALL PRODUCTS (Public)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("seller", "name email rating");

    res.json(products);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE PRODUCT (Protected - only seller can update)
router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description, price, category, image, barterAllowed } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only update your own products" });
    }

    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.image = image || product.image;
    product.barterAllowed = barterAllowed !== undefined ? barterAllowed : product.barterAllowed;

    await product.save();

    res.json(product);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE PRODUCT (Protected - only seller can delete)
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own products" });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;