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