const mongoose =  require('mongoose')

const recordSchema = new mongoose.Schema({
    procedureId: {
        type: mongoose.Schema.ObjectId,
        required: true,

    },
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true,

    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        required: true,

    },
    date: {
        type: Date,
        required: true,

    }
}, { collection: "records" })

module.exports = mongoose.model('Record', recordSchema)
