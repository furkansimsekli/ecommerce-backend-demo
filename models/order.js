const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },

    ownerId: {
        type: String,
        required: true
    },

    productIdList: {
        type: [String],
        required: true
    },

    country: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    zip: {
        type: String,
        required: true
    },

    street: {
        type: String,
        required: true
    },

    apartment: {
        type: String,
        required: true
    }
})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
