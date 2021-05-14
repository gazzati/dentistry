const mongoose =  require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,

    },
    publisher: {
        type: String,
        required: true,

    },
    date: {
        type: String,
        required: true,

    },
    url: {
        type: String,
        required: true,

    }
}, { collection: "books" })

module.exports = mongoose.model('Book', bookSchema)
