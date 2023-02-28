const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Product = require("../models/product");
const { hashPassword, validateUser, generateId } = require("../utils");
const jwt = require("jsonwebtoken");


router.post("/register", async (req, res) => {
    const newUser = {
        id: generateId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        passwordHash: hashPassword(req.body.password),
        phone: req.body.phone,
        email: req.body.email,
        country: req.body.country,
        city: req.body.city,
        zip: req.body.zip,
        street: req.body.street,
        apartment: req.body.apartment
    }

    const validationResult = validateUser(newUser);

    if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error });
    }

    const isEmailExist = await User.findOne({ email: req.body.email });

    if (isEmailExist) {
        return res.status(400).json({ error: "This email already exists" });
    }

    const isPhoneExist = await User.findOne({ phone: req.body.phone });

    if (isPhoneExist) {
        return res.status(400).json({ error: "This phone already exists" });
    }

    await User.insertMany(newUser);
    return res.status(200).json({ message: "Register is successful", user: { ...newUser }});
})

router.post("/login", async (req, res) => {
    const { email, phone, password } = req.body;

    if (!password) {
        return res.status(400).json({ error: "Password field is empty" });
    }

    if (!email && !phone) {
        return res.status(400).json({ error: "Email or phone is required to login" });
    }

    const user = await User.findOne(email ? { email } : { phone }).select("-_id -__v");

    if (!user) {
        return res.status(400).json({ error: "User credentials are wrong" });
    }

    if (hashPassword(password) === user.passwordHash) {
        const token = jwt.sign(
            {
                userId: user.id
            },
            process.env.JWT_SECRET
        )
        return res.status(200).json({ message: "Login is successful" , user: { ...user._doc }, token: token });
    }
    
    return res.status(400).json({ error: "User credentials are wrong" });
});

router.get("/:userId/favorites", async (req, res) => {
    const user = await User.findOne({ id: req.params.userId });
    
    if (!user) {
        return res.status(404).json({ error: "User with given ID couldn't be found" });
    }

    return res.status(200).json({ favoriteProductIdList: user.favoriteProductIdList });
})

router.put("/:userId/favorites", async (req, res) => {
    const user = await User.findOne({ id: req.params.userId });
    
    if (!user) {
        return res.status(404).json({ error: "User with given ID couldn't be found" });
    }

    if (!req.body.productId) {
        return res.status(400).json({ error: "productId field can not be empty" });
    }

    const isProductExist = await Product.findOne({ id: req.body.productId });

    if (!isProductExist) {
        return res.status(404).json({ error: "This product isn't available" })
    }
    
    if (user.favoriteProductIdList.includes(req.body.productId)) {
        return res.status(400).json({ error: "Given product already in the favorites" });
    }

    user.favoriteProductIdList.push(req.body.productId);
    await User.findOneAndUpdate({ id: req.params.userId }, { favoriteProductIdList: user.favoriteProductIdList });
    return res.status(200).json({ message: "Product has been added to favorites"})
})

router.delete("/:userId/favorites/:productId", async (req, res) => {
    const user = await User.findOne({ id: req.params.userId });
    
    if (!user) {
        return res.status(404).json({ error: "User with given ID couldn't be found" });
    }

    const index = user.favoriteProductIdList.indexOf(req.params.productId);

    if (index > -1) {
        user.favoriteProductIdList.splice(index, 1);
        await User.findOneAndUpdate({ id: req.params.userId }, { favoriteProductIdList: user.favoriteProductIdList });
        return res.status(200).json({ message: "Given product successfully removed from favorites" });
    } else {
        return res.status(404).json({ error: "Given productId isn't in the favorites" });
    }
})

router.delete("/:userId/favorites", async (req, res) => {
    const user = await User.findOne({ id: req.params.userId });
    
    if (!user) {
        return res.status(404).json({ error: "User with given ID couldn't be found" });
    }

    await User.findOneAndUpdate({ id: req.params.userId }, { favoriteProductIdList: [] });
    return res.status(200).json({ message: "Favorites has been cleaned" });
})

router.get("/:userId/card", async (req, res) => {
    const user = await User.findOne({ id: req.params.userId });
    
    if (!user) {
        return res.status(404).json({ error: "User with given ID couldn't be found" });
    }

    return res.status(200).json({ cardProductIdList: user.cardProductIdList });
})

router.put("/:userId/card", async (req, res) => {
    const user = await User.findOne({ id: req.params.userId });
    
    if (!user) {
        return res.status(404).json({ error: "User with given ID couldn't be found" });
    }

    if (!req.body.productId) {
        return res.status(400).json({ error: "productId field can not be empty" });
    }
    
    if (user.cardProductIdList.includes(req.body.productId)) {
        return res.status(400).json({ error: "Given product already in the card" });
    }

    user.cardProductIdList.push(req.body.productId);
    await User.findOneAndUpdate({ id: req.params.userId }, { cardProductIdList: user.cardProductIdList });
    return res.status(200).json({ message: "Product has been added to card"})
})

router.delete("/:userId/card/:productId", async(req, res) => {
    const user = await User.findOne({ id: req.params.userId });
    
    if (!user) {
        return res.status(404).json({ error: "User with given ID couldn't be found" });
    }

    const index = user.cardProductIdList.indexOf(req.params.productId);

    if (index > -1) {
        user.cardProductIdList.splice(index, 1);
        await User.findOneAndUpdate({ id: req.params.userId }, { cardProductIdList: user.cardProductIdList });
        return res.status(200).json({ message: "Given product successfully removed from card" });
    } else {
        return res.status(404).json({ error: "Given productId isn't in the card" });
    }
})

router.delete("/:userId/card", async (req, res) => {
    const user = await User.findOne({ id: req.params.userId });
    
    if (!user) {
        return res.status(404).json({ error: "User with given ID couldn't be found" });
    }

    await User.findOneAndUpdate({ id: req.params.userId }, { cardProductIdList: [] });
    return res.status(200).json({ message: "Card has been cleaned" });
})
  
module.exports = router;
