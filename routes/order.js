const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const User = require("../models/user");
const { generateId } = require("../utils");


router.get("/", async (req, res) => {
    const orders = await Order.find({}).select("-_id -__v");
    return res.status(200).json(orders);
})

router.get("/:orderId", async(req, res) => {
    const order = await Order.findOne({ id: req.params.orderId }).select("-_id -__v");

    if (!order) {
        return res.status(404).json({ error: "Order with given ID couldn't be found" });
    }

    return res.status(200).json(order);
})

router.post("/:userId", async (req, res) => {
    const user = await User.findOne({ id: req.params.userId }).select("-_id -__v");
    
    if (!user) {
        return res.status(404).json({ error: "User with given ID couldn't be found" });
    }

    if (!user.cardProductIdList) {
        return res.status(400).json({ error: "User's card is empty"})
    }

    const newOrder = {
        id: generateId(),
        ownerId: user._id,
        productIdList: user.cardProductIdList,
        country: user.country,
        city: user.city,
        zip: user.zip,
        street: user.street,
        apartment: user.apartment
    }

    user.boughtProducts.push(...user.cardProductIdList);
    await Order.insertMany(newOrder);
    await User.findOneAndUpdate({ id: req.params.userId }, { cardProductIdList: [], boughtProducts: user.boughtProducts });  // Clear the card after placing an order
    res.status(200).json({ message: "Order has been placed and the card has been cleared" });
})

module.exports = router;
