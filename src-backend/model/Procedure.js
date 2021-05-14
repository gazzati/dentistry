const mongoose =  require('mongoose')

const procedureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,

    },
    time: {
        type: String,
        required: true,

    },
    price: {
        type: Number,
        required: true,

    }
}, { collection: "procedures" })

module.exports = mongoose.model('Procedure', procedureSchema)
