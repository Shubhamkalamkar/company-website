const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullName: {
        type: String,

    },
    added: {
        type: String
    },
    internId: {
        type: Number
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
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const User = mongoose.model('user', userSchema)

module.exports = User