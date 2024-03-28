const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    comment: {
        type: String,
        trim: true,
    },
    authorid:{
        type:String,
        require:true
    },
    authorname:{
        type:String
    }
})


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;