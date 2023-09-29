const createUser = require('./create/create.user.controller');
const getAll = require('./getAll/getAll.user.controller')
const getById = require('./getById/getById.user.controller')

const userController = {
    create:createUser,
    getAll:getAll,
    getById:getById
}

module.exports = userController;