const mongoose =  require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    procedures: [
        {
            type: mongoose.Schema.ObjectId
        }
    ]
}, { collection: "users" })

module.exports = mongoose.model('User', userSchema)