const express = require("express");
const Request = require("../models/Request");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE REQUEST (Protected)
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { productId, type } = req.body;

    // 1️⃣ Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.status === "sold") {
  return res.status(400).json({ message: "Product already sold" });
}
    // 2️⃣ Prevent requesting your own product
    if (product.seller.toString() === req.user.id) {
      return res.status(400).json({ message: "You cannot request your own product" });
    }

    // 3️⃣ Create request
    const newRequest = await Request.create({
      product: productId,
      buyer: req.user.id,
      type
    });

    res.status(201).json(newRequest);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.put("/status/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const request = await Request.findById(req.params.id).populate("product");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.product.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.status = status;
    if (status === "approved") {
  await Product.findByIdAndUpdate(request.product, {
    isAvailable: false
  });
}
    await request.save();

    if (status === "approved") {
      request.product.status = "sold";
      await request.product.save();
    }

    res.json({ message: `Request ${status}`, request });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/received", authMiddleware, async (req, res) => {
  try {
    const sellerProducts = await Product.find({ seller: req.user.id });

    const productIds = sellerProducts.map(p => p._id);

    const requests = await Request.find({ product: { $in: productIds } })
      .populate("buyer", "name email")
      .populate("product", "title");

    res.json(requests);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// 🔥 Get requests I made (Buyer)
router.get("/my-requests", authMiddleware, async (req, res) => {
  try {
    const requests = await Request.find({ buyer: req.user.id })
      .populate("product");

    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔥 Get requests on my products (Seller)
router.get("/received", authMiddleware, async (req, res) => {
  try {
    const requests = await Request.find()
      .populate({
        path: "product",
        match: { seller: req.user.id }
      })
      .populate("buyer");

    // Remove null products (not seller’s)
    const filtered = requests.filter(r => r.product !== null);

    res.json(filtered);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;