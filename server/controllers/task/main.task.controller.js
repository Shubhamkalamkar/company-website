const create = require('./create/create.task.controller')
const assign = require('./assign/assign.task.controller')
const getAll = require('./getAll/getAll.task.controller')
const getById = require('./getById/getById.task.controller')
const checkTaskAssignOrNot = require('./assign/check.taskAsigned.assign.controller')

const taskController ={
    create: create,
    assign:assign,
    getAll:getAll,
    getbyid:getById,
    checkTaskAssign:checkTaskAssignOrNot
}

module.exports = taskController