const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    _id: String,
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    referenceImg: {
        type: String
    },
    assigned: [
        {
            internId: {
                type: String,
                ref: 'User'
            },
            // Add other fields related to the task here
        }
    ],
    created: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    }

})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task