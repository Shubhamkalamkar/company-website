const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
    },
    created: {
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
    tasks: [
        {
            taskId: {
                type: String,
                ref: 'Task'
            },
            // Add other fields related to the task here
        }
    ],
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const User = mongoose.model('user', userSchema)

module.exports = User