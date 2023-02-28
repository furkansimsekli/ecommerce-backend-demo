const mongoose = require("mongoose");


const reviewSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    
    productId: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    context: {
        type: String,
        required: true
    }
})

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
