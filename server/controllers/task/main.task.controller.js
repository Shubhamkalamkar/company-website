const create = require('./create/create.task.controller')
const assign = require('./assign/assign.task.controller')
const getAll = require('./getAll/getAll.task.controller')
const getById = require('./getById/getById.task.controller')
const taskController ={
    create: create,
    assign:assign,
    getAll:getAll,
    getbyid:getById
}

module.exports = taskController