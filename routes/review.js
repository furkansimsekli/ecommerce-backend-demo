const express = require("express");
const router = express.Router();
const Review = require("../models/review");
const User = require("../models/user");
const { validateReview, generateId } = require("../utils");


router.get("/", async(req, res) => {
    const reviews = await Review.find({}).select("-_id -__v");
    return res.status(200).json(reviews);
})

router.get("/:productId", async(req, res) => {
    const reviews = await Review.find({ productId: req.params.productId }).select("-_id -__v");
    return res.status(200).json(reviews);
})

router.post("/:productId", async(req, res) => {
    const newReview = {
        id: generateId(),
        productId: req.params.productId,
        author: req.body.author,
        context: req.body.context
    }

    const validationResult = validateReview(newReview);

    if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error });
    }

    const user = await User.findOne({ id: req.body.author }).select("-_id -__v");

    if (!user) {
        return res.status(404).json({ error: "User with given ID couldn't be found" });
    }

    if (!user.boughtProducts.includes(req.params.productId)) {
        return res.status(403).json({ error: "User can not make review if the item hasn't been bought"});
    }
    
    const isReviewedBefore = await Review.findOne({ author: req.body.author, productId: req.params.productId })

    if (isReviewedBefore) {
        return res.status(400).json({ error: "User can make only one review"});
    }

    await Review.insertMany(newReview);
    return res.status(200).json({ message: "Review has been successfully inserted to product", review: { ...newReview }});
})

module.exports = router
