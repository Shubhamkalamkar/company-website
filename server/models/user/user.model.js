const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullName: {
        type: String,

    },
    added: {
        type: String
    },
    internId: {
        type: Number,
        required: true
    },
    email: {
        type: String,
    },
    password: {
        type: String,

    },
    role: {
        type: String,

        default: "user"
    },
    progress: {
        type: String
    },
    isUserSignup: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('user', userSchema)

module.exports = User