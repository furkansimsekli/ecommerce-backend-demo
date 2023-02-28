const express = require("express");
const router = express.Router();
const Product = require("../models/product");


router.get("/", async (req, res) => {
    const products = await Product.find({}).select("-_id -__v");
    return res.status(200).json(products);
})

router.get("/:productId", async(req, res) => {
    const product = await Product.findOne({ id: req.params.productId }).select("-_id -__v");

    if (!product) {
        return res.status(404).json({ error: "Product with given ID couldn't be found" });
    }

    return res.status(200).json(product);
})

module.exports = router;
