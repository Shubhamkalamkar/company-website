const create = require('./create/create.task.controller')
const assign = require('./assign/assign.task.controller')

const taskController ={
    create: create,
    assign:assign
}

module.exports = taskController