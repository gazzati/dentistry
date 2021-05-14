const mongoose =  require('mongoose')

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    mark: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    }
}, { collection: "reviews" })

module.exports = mongoose.model('Reviews', reviewSchema)
