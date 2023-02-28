const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    passwordHash: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    favoriteProductIdList: {
        type: [String],
        default: []
    },

    cardProductIdList: {
        type: [String],
        default: []
    },

    boughtProducts: {
        type: [String],
        default: []
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

const User = mongoose.model('User', userSchema);
module.exports = User;
