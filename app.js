const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const { validateJwt, errorHandler } = require("./middleware");

const userRoute = require("./routes/user");
const orderRoute = require("./routes/order");
const productRoute = require("./routes/product");
const reviewRoute = require("./routes/review");

require("dotenv/config");

const API_URL = process.env.API_URL;
const DB_URI = process.env.DB_URI;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(validateJwt);
app.use(errorHandler);
app.use(morgan("tiny"));    // Logging

app.use(`${API_URL}/users`, userRoute);
app.use(`${API_URL}/products`, productRoute);
app.use(`${API_URL}/orders`, orderRoute);
app.use(`${API_URL}/reviews`, reviewRoute);

app.listen(3000, () => {
    mongoose.set("strictQuery", true);
    mongoose.connect(DB_URI)
    .then(() => {
        console.log("Database connection has been established...")
    })
    .catch((err) => {
        console.log(err)
    })
    console.log("Server is running on http://localhost:3000");
});
